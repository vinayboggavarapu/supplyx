const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_manufacturerAddress",
        type: "address",
      },
    ],
    name: "addManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "preOrderId",
        type: "string",
      },
      {
        internalType: "address",
        name: "retailer",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "addPreOrderCountForRetailer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_retailerAddress",
        type: "address",
      },
    ],
    name: "addRetailer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_retailer",
        type: "address",
      },
    ],
    name: "confirmOrderManufacturer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manufacturer",
        type: "address",
      },
    ],
    name: "confirmPreOrderRetailer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "retailer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "count",
        type: "string",
      },
    ],
    name: "CountAddedByManufacturer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "retailer",
        type: "address",
      },
    ],
    name: "OrderConfirmedByManufacturer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "retailer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
    ],
    name: "OrderConfirmedByRetailer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "highPriority",
        type: "bool",
      },
    ],
    name: "OrderPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "retailer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rawMaterialCost",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingPayment",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manufacturer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
    ],
    name: "preOrder",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "preOrderId",
        type: "string",
      },
    ],
    name: "PreOrderConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "orderPlacer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "orderIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "highPriority",
        type: "bool",
      },
    ],
    name: "PriorityUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_manufacturer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_orderIndex",
        type: "uint256",
      },
    ],
    name: "updateOrderPriority",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getmanufacturers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRetailers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isManufacturer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isRetailer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "manufacturerOrders",
    outputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "escrowBalance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        internalType: "bool",
        name: "manufacturerConfirmed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "orderCompleted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "highPriority",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "manufacturers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "manufacturerSet",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "retailerConfirmed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "retailers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userOrders",
    outputs: [
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "escrowBalance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "manufacturer",
        type: "address",
      },
      {
        internalType: "bool",
        name: "manufacturerConfirmed",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "orderCompleted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "highPriority",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const contractAddress = "0x9A869Bff83E8539BEaEeb419f2dE0dbE4beb9a51";
export default abi;
