// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SupplyX {
    struct Order {
        uint256 quantity;
        uint256 escrowBalance;
        address manufacturer;
        bool manufacturerConfirmed;
        bool orderCompleted;
        bool highPriority;
    }

    address[] public retailers;
    address[] public manufacturers;

    mapping(address => Order[]) public userOrders;
    mapping(address => bool) public isRetailer;
    mapping(address => bool) public isManufacturer;
    mapping(address => mapping(address => Order[])) public manufacturerOrders;
    mapping(address => mapping(address => uint256)) private totalPreOrderCount;
    mapping(address => mapping(address => string))
        private manufacturerPreOrderId;

    // Mapping to check if manufacturer has set a order/preOrder for a specific retailer
    mapping(address => mapping(address => bool)) public manufacturerSet;

    // Mapping to check if retailer has confirmed the order/preOrder
    mapping(address => mapping(address => bool)) public retailerConfirmed;

    mapping(string => address) private _manufacturerSelectedCustomerAddress;

    mapping(address => mapping(address => bool)) private hasPreOrder;

    event OrderPlaced(
        address indexed buyer,
        uint256 quantity,
        bool highPriority
    );
    event OrderConfirmedByManufacturer(
        address indexed manufacturer,
        address indexed retailer
    );
    event OrderConfirmedByRetailer(
        address indexed retailer,
        address indexed manufacturer
    );
    event CountAddedByManufacturer(
        address indexed manufacturer,
        address indexed retailer,
        string count
    );
    event PriorityUpdated(
        address indexed orderPlacer,
        uint256 orderIndex,
        bool highPriority
    );
    event PaymentReleased(
        address indexed retailer,
        address indexed manufacturer,
        uint256 rawMaterialCost,
        uint256 remainingPayment
    );

    event PreOrderConfirmed(address indexed customer, string preOrderId);

    modifier onlyManufacturer() {
        require(
            isManufacturer[msg.sender],
            "Only manufacturer can call this function."
        );
        _;
    }

    modifier onlyRetailer() {
        require(
            isRetailer[msg.sender],
            "Only retailer can call this function."
        );
        _;
    }

    function addRetailer(address _retailerAddress) external {
        require(!isRetailer[_retailerAddress], "Retailer already exists.");
        isRetailer[_retailerAddress] = true;
        retailers.push(_retailerAddress);
    }

    function addManufacturer(address _manufacturerAddress) external {
        require(
            !isManufacturer[_manufacturerAddress],
            "Manufacturer already exists."
        );
        isManufacturer[_manufacturerAddress] = true;
        manufacturers.push(_manufacturerAddress);
    }

    function preOrder(
        address _manufacturer,
        uint256 _quantity
    ) external payable {
        require(msg.value >= 0.005 ether * _quantity, "Insufficient payment.");
        require(
            !hasPreOrder[_manufacturer][msg.sender],
            "Preorder already exists for this manufacturer."
        );

        Order memory order = Order({
            quantity: _quantity,
            escrowBalance: msg.value,
            manufacturer: _manufacturer,
            manufacturerConfirmed: false,
            orderCompleted: false,
            highPriority: false
        });

        manufacturerOrders[_manufacturer][msg.sender].push(order);
        totalPreOrderCount[_manufacturer][msg.sender]++;

        userOrders[msg.sender].push(order);

        hasPreOrder[_manufacturer][msg.sender] = true;

        emit OrderPlaced(msg.sender, _quantity, false);
    }

    function updateOrderPriority(
        address _manufacturer,
        uint256 _orderIndex
    ) external payable {
        require(_manufacturer != address(0), "Invalid manufacturer address");
        require(
            _orderIndex < manufacturerOrders[_manufacturer][msg.sender].length,
            "Invalid index."
        );
        require(
            msg.value >= 0.001 ether,
            "Minimum fee for priority update is 0.002 ether."
        );

        Order storage order = userOrders[msg.sender][_orderIndex];

        require(
            !order.manufacturerConfirmed,
            "Cannot update the confirmed order."
        );
        order.highPriority = true;

        emit PriorityUpdated(msg.sender, _orderIndex, true);
    }

    function addPreOrderCountForRetailer(
        string memory preOrderId,
        address retailer,
        address user
    ) external onlyManufacturer {
        manufacturerPreOrderId[msg.sender][retailer] = preOrderId;
        manufacturerSet[msg.sender][retailer] = true;

        _manufacturerSelectedCustomerAddress[preOrderId] = user;

        emit CountAddedByManufacturer(msg.sender, retailer, preOrderId);
    }

    function confirmPreOrderRetailer(
        address _manufacturer
    ) external onlyRetailer {
        // Checking if the manufacturer has already set a preOrder for this retailer
        require(
            manufacturerSet[_manufacturer][msg.sender],
            "Manufacturer has not set preOrder for this retailer."
        );

        retailerConfirmed[msg.sender][_manufacturer] = true;

        emit OrderConfirmedByRetailer(msg.sender, _manufacturer);

        // Resetting manufacturer set value after retailer confirmation.
        manufacturerSet[_manufacturer][msg.sender] = false;
    }

    function getRetailers() external view returns (address[] memory) {
        return retailers;
    }

    function getmanufacturers() external view returns (address[] memory) {
        return manufacturers;
    }

    function confirmOrderManufacturer(
        address _retailer
    ) external onlyManufacturer {
        string memory preOrderId = manufacturerPreOrderId[msg.sender][
            _retailer
        ];
        // Ensuring the retailer has confirmed
        require(
            retailerConfirmed[_retailer][msg.sender],
            "Order must be confirmed by retailer first."
        );

        address customer = _manufacturerSelectedCustomerAddress[preOrderId];

        Order storage order = userOrders[customer][0];

        if (!order.manufacturerConfirmed) {
            emit OrderConfirmedByManufacturer(msg.sender, _retailer);

            if (order.escrowBalance > 0) {
                uint256 totalEscrowAmount = order.escrowBalance;
                order.escrowBalance = 0;

                uint256 rawMaterialCost = 0.001 ether;
                uint256 remainingPayment = totalEscrowAmount - rawMaterialCost;

                (bool transferToManufacturer, ) = payable(order.manufacturer)
                    .call{value: rawMaterialCost}("");
                (bool transferToRetailer, ) = payable(_retailer).call{
                    value: remainingPayment
                }("");

                require(
                    transferToManufacturer,
                    "Transfer to manufacturer failed."
                );
                require(transferToRetailer, "Transfer to retailer failed.");

                order.manufacturerConfirmed = true;
                order.orderCompleted = true;

                emit PreOrderConfirmed(customer, preOrderId);

                // The remaining escrow balance of the order for the retailer is already updated above

                emit PaymentReleased(
                    _retailer,
                    order.manufacturer,
                    rawMaterialCost,
                    remainingPayment
                );
            }
        }
    }
}
