pragma solidity ^0.5.0;

interface ISWAP {
    function balanceOf(address who) external view returns (uint256);
    
    function burnFrom(address from, uint256 value) external;
     
    function transfer(address to, uint256 value) external returns (bool);
}

contract Swap {
    address owner;
    ISWAP _xpnTokenAddress;
    ISWAP _ypnTokenAddress;
    mapping (address => uint256) burnedToken;
    
    
    constructor(ISWAP xpnAddress, ISWAP ypnAddress) public {
        owner = msg.sender;
        _xpnTokenAddress = xpnAddress;
        _ypnTokenAddress = ypnAddress;
    }
    
    // function setNewToken(YPN ypnTokenAddress) external {
    //     _ypnTokenAddress = ypnTokenAddress;
    // }
    
    // function checkMsgSender() public view returns (address) {
    //     return _xpnTokenAddress.checkMsgSender();
    // }
    
    function newTokenContractBalance() public view returns (uint256) {
        return _ypnTokenAddress.balanceOf(address(this));
    }
    
    function approvedTokenBurn(uint256 value) public returns (bool) {
        _xpnTokenAddress.burnFrom(msg.sender, value);
        burnedToken[msg.sender] = value;
        return true;
    }
    
    function newTokenTransfer() public returns (bool) {
        require(burnedToken[msg.sender] != 0);
        _ypnTokenAddress.transfer(msg.sender, burnedToken[msg.sender]);
        burnedToken[msg.sender] = 0;
        return true;
    }
    
    function tokenSwap(uint256 value) public returns (bool) {
        require(approvedTokenBurn(value));
        require(newTokenTransfer());
        return true;
    }
}
