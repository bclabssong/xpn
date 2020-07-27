pragma solidity ^0.5.0;

interface ISwap {
    function balanceOf(address who) external view returns (uint256);
    
    function burnFrom(address from, uint256 value) external;
     
    function transfer(address to, uint256 value) external returns (bool);
}


interface IWhitelist {
    function balanceOf(address owner) external view returns (uint256 balance);
}


contract Swap {
    address owner;
    ISwap _xpnTokenAddress;
    ISwap _ypnTokenAddress;
    IWhitelist _vipWhitelist;
    
    mapping(address => uint256) burnedToken;
    
    constructor(ISwap xpnAddress, ISwap ypnAddress, IWhitelist whitelistAddress) public {
        owner = msg.sender;
        _xpnTokenAddress = xpnAddress;
        _ypnTokenAddress = ypnAddress;
        _vipWhitelist = whitelistAddress;
    }

    function tokenSwap(uint256 value) public returns (bool) {
        require(checkWhitelist() == 1);
        require(approvedTokenBurn(value));
        require(newTokenTransfer());
        return true;
    }

    function newTokenContractBalance() public view returns (uint256) {
        return _ypnTokenAddress.balanceOf(address(this));
    }

    function checkWhitelist() internal view returns (uint256) {
        return _vipWhitelist.balanceOf(msg.sender);
    }

    function approvedTokenBurn(uint256 value) internal returns (bool) {
        _xpnTokenAddress.burnFrom(msg.sender, value);
        burnedToken[msg.sender] = value;
        return true;
    }
    
    function newTokenTransfer() internal returns (bool) {
        require(burnedToken[msg.sender] != 0);
        _ypnTokenAddress.transfer(msg.sender, burnedToken[msg.sender]);
        burnedToken[msg.sender] = 0;
        return true;
    }
}