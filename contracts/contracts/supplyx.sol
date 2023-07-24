// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyX {
    struct Order {
        uint256 quantity;
        uint256 escrowBalance;
        bool retailerConfirmed;
        bool manufacturerConfirmed;
    }

    mapping(address => Order) public orders;
    mapping(address => address[]) public retailerPreOrderBuyers;
    mapping(address => address[]) public manufacturerPreOrderBuyers;

    mapping(address => bool) public isRetailer;
    mapping(address => bool) public isManufacturer;

    event PreOrderPlaced(address indexed buyer, uint256 quantity);
    event OrderConfirmed(address indexed retailer, address indexed manufacturer, address indexed buyer, uint256 quantity);
    event OrderShipped(address indexed retailer, address indexed manufacturer, address indexed buyer, uint256 quantity);
    event PaymentReleased(address indexed buyer, address indexed retailer, address indexed manufacturer, uint256 rawMaterialCost, uint256 remainingPayment);

    modifier onlyRetailer() {
        require(isRetailer[msg.sender], "Only retailer can call this function.");
        _;
    }

    modifier onlyManufacturer() {
        require(isManufacturer[msg.sender], "Only manufacturer can call this function.");
        _;
    }

    function addRetailer(address _retailerAddress) external {
        require(!isRetailer[_retailerAddress], "Retailer already exists.");
        isRetailer[_retailerAddress] = true;
    }

    function addManufacturer(address _manufacturerAddress) external {
        require(!isManufacturer[_manufacturerAddress], "Manufacturer already exists.");
        isManufacturer[_manufacturerAddress] = true;
    }

    function placeOrder(uint256 _quantity) external payable {
        require(!orders[msg.sender].retailerConfirmed && !orders[msg.sender].manufacturerConfirmed, "Order already placed or confirmed.");
        require(msg.value >= orders[msg.sender].quantity * _quantity, "Insufficient payment.");

        orders[msg.sender].quantity = _quantity;
        orders[msg.sender].escrowBalance = msg.value;

        address retailerAddress = getRetailerFor(msg.sender);
        address manufacturerAddress = getManufacturerFor(msg.sender);

        retailerPreOrderBuyers[retailerAddress].push(msg.sender);
        manufacturerPreOrderBuyers[manufacturerAddress].push(msg.sender);

        emit PreOrderPlaced(msg.sender, _quantity);
    }

    function confirmOrder() external onlyRetailer {
        address[] memory preOrderBuyers = retailerPreOrderBuyers[msg.sender];
        require(preOrderBuyers.length > 0, "No pre-orders available.");
        require(!orders[msg.sender].retailerConfirmed, "Order already confirmed by this retailer.");

        orders[msg.sender].retailerConfirmed = true;

        emit OrderConfirmed(msg.sender, getManufacturerFor(msg.sender), preOrderBuyers[0], orders[preOrderBuyers[0]].quantity);

        if (allConfirmed(preOrderBuyers)) {
            releasePayment(preOrderBuyers);
        }
    }

    function confirmShipment() external onlyManufacturer {
        address[] memory preOrderBuyers = manufacturerPreOrderBuyers[msg.sender];
        require(preOrderBuyers.length > 0, "No pre-orders available.");
        require(orders[getRetailerFor(msg.sender)].retailerConfirmed, "Retailer has not confirmed the shipment.");
        require(!orders[msg.sender].manufacturerConfirmed, "Order already confirmed by this manufacturer.");

        orders[msg.sender].manufacturerConfirmed = true;

        emit OrderShipped(getRetailerFor(msg.sender), msg.sender, preOrderBuyers[0], orders[preOrderBuyers[0]].quantity);

        if (allConfirmed(preOrderBuyers)) {
            releasePayment(preOrderBuyers);
        }
    }

    function allConfirmed(address[] memory _preOrderBuyers) internal view returns (bool) {
        if (_preOrderBuyers.length == 0) {
            return false;
        }

        for (uint256 i = 0; i < _preOrderBuyers.length; i++) {
            address buyer = _preOrderBuyers[i];
            if (!orders[buyer].retailerConfirmed || !orders[buyer].manufacturerConfirmed) {
                return false;
            }
        }
        return true;
    }

    function releasePayment(address[] memory _preOrderBuyers) internal {
        for (uint256 i = 0; i < _preOrderBuyers.length; i++) {
            address buyer = _preOrderBuyers[i];
            uint256 totalEscrowAmount = orders[buyer].escrowBalance;
            orders[buyer].escrowBalance = 0;

            uint256 rawMaterialCost = totalEscrowAmount / 2;
            uint256 remainingPayment = totalEscrowAmount - rawMaterialCost;

            address retailerAddress = getRetailerFor(buyer);
            address manufacturerAddress = getManufacturerFor(buyer);

            payable(retailerAddress).transfer(rawMaterialCost);
            payable(manufacturerAddress).transfer(remainingPayment);

            emit PaymentReleased(buyer, retailerAddress, manufacturerAddress, rawMaterialCost, remainingPayment);
        }
    }

    function getRetailerFor(address _buyer) internal view returns (address) {
        for (uint256 i = 0; i < retailerPreOrderBuyers[msg.sender].length; i++) {
            if (retailerPreOrderBuyers[msg.sender][i] == _buyer) {
                return msg.sender;
            }
        }
        revert("Retailer not found.");
    }

    function getManufacturerFor(address _buyer) internal view returns (address) {
        for (uint256 i = 0; i < manufacturerPreOrderBuyers[msg.sender].length; i++) {
            if (manufacturerPreOrderBuyers[msg.sender][i] == _buyer) {
                return msg.sender;
            }
        }
        revert("Manufacturer not found.");
    }
}
