// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyX {
    address public retailerAddress; // retailer address
    address public manufacturerAddress; // manufacturer address
    address[] public preOrderBuyers;

    mapping(address => uint256) public escrowBalances;
    mapping(address => bool) public retailerConfirmed;
    mapping(address => bool) public manufacturerConfirmed;
    mapping(address => bool) public hasPlacedOrder;

    uint256 public unitPrice; // price of the product

    event PreOrderPlaced(address indexed buyer, uint256 quantity);
    event OrderConfirmed(address indexed retailer, address indexed manufacturer, uint256 quantity);
    event OrderShipped(address indexed retailer, address indexed manufacturer, uint256 quantity);
    event PaymentReleased(address indexed buyer, address indexed retailer, address indexed manufacturer, uint256 rawMaterialCost, uint256 remainingPayment);

    constructor(address _retailerAddress, address _manufacturerAddress, uint256 _unitPrice) {
        retailerAddress = _retailerAddress;
        manufacturerAddress = _manufacturerAddress;
        unitPrice = _unitPrice;
    }

    modifier onlyRetailer() {
        require(msg.sender == retailerAddress, "Only retailer can call this function.");
        _; // retailer confirmation functionality
    }

    modifier onlyManufacturer() {
        require(msg.sender == manufacturerAddress, "Only manufacturer can call this function.");
        _; // manufacturer confirmation functionality
    }

    function placeOrder(uint256 _quantity) external payable {
        require(!hasPlacedOrder[msg.sender], "Wallet has already placed an order.");
        require(msg.value >= unitPrice * _quantity, "Insufficient payment.");

        escrowBalances[msg.sender] += msg.value;
        preOrderBuyers.push(msg.sender);
        hasPlacedOrder[msg.sender] = true;
        emit PreOrderPlaced(msg.sender, _quantity);
    }

    function confirmOrder() external onlyRetailer {
        require(preOrderBuyers.length > 0, "No pre-orders available.");
        require(!retailerConfirmed[msg.sender], "Order already confirmed by this retailer.");

        retailerConfirmed[msg.sender] = true;

        emit OrderConfirmed(retailerAddress, manufacturerAddress, escrowBalances[preOrderBuyers[0]]);

        if (allConfirmed()) {
            releasePayment();
        }
    }

    function confirmShipment() external onlyManufacturer {
        require(preOrderBuyers.length > 0, "No pre-orders available.");
        require(retailerConfirmed[retailerAddress], "Retailer has not confirmed the shipment.");
        require(!manufacturerConfirmed[msg.sender], "Order already confirmed by this manufacturer.");

        manufacturerConfirmed[msg.sender] = true;

        emit OrderShipped(retailerAddress, manufacturerAddress, escrowBalances[preOrderBuyers[0]]);

        if (allConfirmed()) {
            releasePayment();
        }
    }

    function allConfirmed() internal view returns (bool) {
        if (preOrderBuyers.length == 0) {
            return false;
        }

        for (uint256 i = 0; i < preOrderBuyers.length; i++) {
            address buyer = preOrderBuyers[i];
            if (!retailerConfirmed[retailerAddress] || !manufacturerConfirmed[manufacturerAddress]) {
                return false;
            }
        }
        return true;
    }

    function releasePayment() internal {
        for (uint256 i = 0; i < preOrderBuyers.length; i++) {
            address buyer = preOrderBuyers[i];
            uint256 totalEscrowAmount = escrowBalances[buyer];
            escrowBalances[buyer] = 0;

            uint256 rawMaterialCost = totalEscrowAmount / 2;
            uint256 remainingPayment = totalEscrowAmount - rawMaterialCost;

            payable(retailerAddress).transfer(rawMaterialCost);
            payable(manufacturerAddress).transfer(remainingPayment);

            emit PaymentReleased(buyer, retailerAddress, manufacturerAddress, rawMaterialCost, remainingPayment);
        }
    }
}
