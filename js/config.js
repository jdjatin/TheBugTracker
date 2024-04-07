// Use Remix to deploy smart contract to local Ganache blockchain.
// Make note of the address the contract was deployed to, and paste it below.

let contractAddress = '0x8A464CfBF6777e7C76017034616f09B08617e89D';

// Define the smart contract ABI (Application Binary Interface).
let contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bugID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_criticality",
				"type": "uint8"
			}
		],
		"name": "addBug",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bugIndex",
				"type": "uint256"
			}
		],
		"name": "deleteBug",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bugIndex",
				"type": "uint256"
			}
		],
		"name": "updateBugStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bugIndex",
				"type": "uint256"
			}
		],
		"name": "getBug",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "bugID",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "enum BugTracker.Criticality",
						"name": "criticality",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isResolved",
						"type": "bool"
					}
				],
				"internalType": "struct BugTracker.Bug",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBugCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userBugs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "bugID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "enum BugTracker.Criticality",
				"name": "criticality",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isResolved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];