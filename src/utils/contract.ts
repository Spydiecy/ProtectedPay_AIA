import { ethers } from 'ethers';

const contractAddress = '0xCa36dD890F987EDcE1D6D7C74Fb9df627c216BF6';
const contractABI = [
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TransferClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TransferInitiated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TransferRefunded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_senderAddress",
          "type": "address"
        }
      ],
      "name": "claimTransferByAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_transferId",
          "type": "bytes32"
        }
      ],
      "name": "claimTransferById",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_senderUsername",
          "type": "string"
        }
      ],
      "name": "claimTransferByUsername",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_transferId",
          "type": "bytes32"
        }
      ],
      "name": "getTransferDetails",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "enum SafeSend.TransferStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct SafeSend.Transfer",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getUserByAddress",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "getUserByUsername",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getUserTransfers",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "enum SafeSend.TransferStatus",
              "name": "status",
              "type": "uint8"
            }
          ],
          "internalType": "struct SafeSend.Transfer[]",
          "name": "",
          "type": "tuple[]"
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
      "name": "pendingTransfersBySender",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_transferId",
          "type": "bytes32"
        }
      ],
      "name": "refundTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "registerUsername",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_recipient",
          "type": "address"
        }
      ],
      "name": "sendToAddress",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        }
      ],
      "name": "sendToUsername",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "transfers",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "enum SafeSend.TransferStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "usernameToAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
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
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

export const getContract = (signer: ethers.Signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const registerUsername = async (signer: ethers.Signer, username: string) => {
  const contract = getContract(signer);
  const tx = await contract.registerUsername(username);
  await tx.wait();
};

export const sendToAddress = async (signer: ethers.Signer, recipient: string, amount: string) => {
  const contract = getContract(signer);
  const tx = await contract.sendToAddress(recipient, { value: ethers.utils.parseEther(amount) });
  await tx.wait();
};

export const sendToUsername = async (signer: ethers.Signer, username: string, amount: string) => {
  const contract = getContract(signer);
  const tx = await contract.sendToUsername(username, { value: ethers.utils.parseEther(amount) });
  await tx.wait();
};

export const claimTransferByAddress = async (signer: ethers.Signer, senderAddress: string) => {
  const contract = getContract(signer);
  const tx = await contract.claimTransferByAddress(senderAddress);
  await tx.wait();
};

export const claimTransferByUsername = async (signer: ethers.Signer, senderUsername: string) => {
  const contract = getContract(signer);
  const tx = await contract.claimTransferByUsername(senderUsername);
  await tx.wait();
};

export const claimTransferById = async (signer: ethers.Signer, transferId: string) => {
  const contract = getContract(signer);
  const tx = await contract.claimTransferById(transferId);
  await tx.wait();
};

export const refundTransfer = async (signer: ethers.Signer, transferId: string) => {
  const contract = getContract(signer);
  const tx = await contract.refundTransfer(transferId);
  await tx.wait();
};

export const getUserTransfers = async (signer: ethers.Signer, userAddress: string) => {
  const contract = getContract(signer);
  return await contract.getUserTransfers(userAddress);
};

export const getTransferDetails = async (signer: ethers.Signer, transferId: string) => {
  const contract = getContract(signer);
  return await contract.getTransferDetails(transferId);
};

export const getUserByUsername = async (signer: ethers.Signer, username: string) => {
  const contract = getContract(signer);
  return await contract.getUserByUsername(username);
};

export const getUserByAddress = async (signer: ethers.Signer, address: string) => {
  const contract = getContract(signer);
  return await contract.getUserByAddress(address);
};

// Define a type for the Transfer Event
interface TransferEvent {
	type: 'TransferInitiated' | 'TransferClaimed' | 'TransferRefunded';
	transferId: string;
	sender?: string; // Optional because it may not be present for all event types
	recipient?: string; // Optional because it may not be present for all event types
	amount: string;
	event: ethers.Event;
  }
  
  // Update the listenForTransferEvents function
  export const listenForTransferEvents = (
	signer: ethers.Signer,
	callback: (event: TransferEvent) => void
  ) => {
	const contract = getContract(signer);
	
	contract.on('TransferInitiated', (transferId: string, sender: string, recipient: string, amount: ethers.BigNumber, event: ethers.Event) => {
	  callback({
		type: 'TransferInitiated',
		transferId,
		sender,
		recipient,
		amount: ethers.utils.formatEther(amount),
		event,
	  });
	});
	
	contract.on('TransferClaimed', (transferId: string, recipient: string, amount: ethers.BigNumber, event: ethers.Event) => {
	  callback({
		type: 'TransferClaimed',
		transferId,
		recipient,
		amount: ethers.utils.formatEther(amount),
		event,
	  });
	});
	
	contract.on('TransferRefunded', (transferId: string, sender: string, amount: ethers.BigNumber, event: ethers.Event) => {
	  callback({
		type: 'TransferRefunded',
		transferId,
		sender,
		amount: ethers.utils.formatEther(amount),
		event,
	  });
	});
	
	return () => {
	  contract.removeAllListeners();
	};
  };
  