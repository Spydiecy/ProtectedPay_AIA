// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SafeSend is ReentrancyGuard {
    enum TransferStatus { Pending, Claimed, Refunded }

    struct Transfer {
        address sender;
        address recipient;
        uint256 amount;
        uint256 timestamp;
        TransferStatus status;
    }

    struct User {
        string username;
        bytes32[] transferIds;
    }

    mapping(bytes32 => Transfer) public transfers;
    mapping(address => User) public users;
    mapping(string => address) public usernameToAddress;
    mapping(address => bytes32[]) public pendingTransfersBySender;

    event UserRegistered(address indexed userAddress, string username);
    event TransferInitiated(bytes32 indexed transferId, address indexed sender, address indexed recipient, uint256 amount);
    event TransferClaimed(bytes32 indexed transferId, address indexed recipient, uint256 amount);
    event TransferRefunded(bytes32 indexed transferId, address indexed sender, uint256 amount);

    function registerUsername(string memory _username) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(users[msg.sender].username).length == 0, "User already registered");
        require(usernameToAddress[_username] == address(0), "Username already taken");

        users[msg.sender].username = _username;
        usernameToAddress[_username] = msg.sender;

        emit UserRegistered(msg.sender, _username);
    }

    function sendToAddress(address _recipient) external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_recipient != address(0), "Invalid recipient address");

        _initiateTransfer(_recipient);
    }

    function sendToUsername(string memory _username) external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than 0");
        address recipientAddress = usernameToAddress[_username];
        require(recipientAddress != address(0), "Username not found");

        _initiateTransfer(recipientAddress);
    }

    function _initiateTransfer(address _recipient) private {
        bytes32 transferId = keccak256(abi.encodePacked(msg.sender, _recipient, msg.value, block.timestamp));

        transfers[transferId] = Transfer({
            sender: msg.sender,
            recipient: _recipient,
            amount: msg.value,
            timestamp: block.timestamp,
            status: TransferStatus.Pending
        });

        users[msg.sender].transferIds.push(transferId);
        pendingTransfersBySender[msg.sender].push(transferId);

        emit TransferInitiated(transferId, msg.sender, _recipient, msg.value);
    }

    function claimTransfer(bytes32 _transferId) internal {
        Transfer storage transfer = transfers[_transferId];
        require(transfer.recipient == msg.sender, "You are not the intended recipient");
        require(transfer.status == TransferStatus.Pending, "Transfer is not claimable");

        transfer.status = TransferStatus.Claimed;

        payable(msg.sender).transfer(transfer.amount);

        if (bytes(users[msg.sender].username).length > 0) {
            users[msg.sender].transferIds.push(_transferId);
        }

        removePendingTransfer(transfer.sender, _transferId);

        emit TransferClaimed(_transferId, msg.sender, transfer.amount);
    }

    function claimTransferByUsername(string memory _senderUsername) external nonReentrant {
        address senderAddress = usernameToAddress[_senderUsername];
        require(senderAddress != address(0), "Sender username not found");
        bytes32 transferId = findPendingTransfer(senderAddress);
        claimTransfer(transferId);
    }

    function claimTransferByAddress(address _senderAddress) external nonReentrant {
        bytes32 transferId = findPendingTransfer(_senderAddress);
        claimTransfer(transferId);
    }

    function claimTransferById(bytes32 _transferId) external nonReentrant {
        claimTransfer(_transferId);
    }

    function findPendingTransfer(address _sender) internal view returns (bytes32) {
        bytes32[] memory pendingTransfers = pendingTransfersBySender[_sender];
        for (uint i = 0; i < pendingTransfers.length; i++) {
            Transfer memory transfer = transfers[pendingTransfers[i]];
            if (transfer.recipient == msg.sender && transfer.status == TransferStatus.Pending) {
                return pendingTransfers[i];
            }
        }
        revert("No pending transfer found");
    }

    function removePendingTransfer(address _sender, bytes32 _transferId) internal {
        bytes32[] storage pendingTransfers = pendingTransfersBySender[_sender];
        for (uint i = 0; i < pendingTransfers.length; i++) {
            if (pendingTransfers[i] == _transferId) {
                pendingTransfers[i] = pendingTransfers[pendingTransfers.length - 1];
                pendingTransfers.pop();
                break;
            }
        }
    }

    function refundTransfer(bytes32 _transferId) external nonReentrant {
        Transfer storage transfer = transfers[_transferId];
        require(transfer.sender == msg.sender, "You are not the sender");
        require(transfer.status == TransferStatus.Pending, "Transfer is not refundable");

        transfer.status = TransferStatus.Refunded;

        payable(msg.sender).transfer(transfer.amount);

        removePendingTransfer(msg.sender, _transferId);

        emit TransferRefunded(_transferId, msg.sender, transfer.amount);
    }

    function getUserTransfers(address _userAddress) external view returns (Transfer[] memory) {
        bytes32[] memory userTransferIds = users[_userAddress].transferIds;
        Transfer[] memory userTransfers = new Transfer[](userTransferIds.length);

        for (uint i = 0; i < userTransferIds.length; i++) {
            userTransfers[i] = transfers[userTransferIds[i]];
        }

        return userTransfers;
    }

    function getTransferDetails(bytes32 _transferId) external view returns (Transfer memory) {
        return transfers[_transferId];
    }

    function getUserByUsername(string memory _username) external view returns (address) {
        return usernameToAddress[_username];
    }

    function getUserByAddress(address _userAddress) external view returns (string memory) {
        return users[_userAddress].username;
    }
}