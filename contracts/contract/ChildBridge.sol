//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { USDI } from "./USDI.sol";
//import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChildBridge {
    address usdi_addr; // USDI smart contract address on Excoincial
    address owner; // Owner address
    address ChildChainProxyManager;  //ChildChainProxyManager address
    bool warning = false;

    USDI usdiContract;
    // IERC20 usdiContract;

    mapping (address => bool) gateways;
    address[] addedAddress;

    event Release(address from, uint amount);
    event Unrelease(address from, uint amount);
    event Withdraw(uint amount);
    event TransferOwnerAddress(address newOwner);
    event TransferChildChainProxyManagerAddress(address newChildChainProxyManager);

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not Owner");
        _;
    }

    modifier onlyChildChainProxyManager() {
        require(ChildChainProxyManager == msg.sender, "You are not ChildChainProxyManager");
        _;
    }

    modifier onlyGateway() {
        require(gateways[msg.sender], "Your information is not verified by ChildChainProxyManager.");
        _;
    }




    constructor(address _usdi) {
        owner = msg.sender;
        ChildChainProxyManager = msg.sender;
        usdi_addr = _usdi;
        usdiContract = USDI(usdi_addr);
        // usdiContract = IERC20(usdi_addr);
    }





    function unrelease(address _from, uint _amount) public onlyGateway {
        require(usdiContract.allowance(_from, address(this)) >= _amount, "The approved amount is not enough.");
        usdiContract.transferFrom(_from, address(this), _amount);
        emit Unrelease(_from, _amount);
    }

    function release(address _to, uint _amount) public onlyGateway {
        if (usdiContract.balanceOf(address(this)) <= _amount) {
            warning = true;
            require(!warning, "Excuse me, please try again later.");
        }
        usdiContract.transfer(_to, _amount);
        emit Release(_to, _amount);
    }

    function withdraw(uint _amount) public onlyOwner{
        require(_amount != 0, "Check the amount you want to withdraw.");
        require(_amount <= usdiContract.balanceOf(address(this)), "The amount you want is too large");
        usdiContract.transfer(owner, _amount);
        emit Withdraw(_amount);
    }





    function addGateway(address[] memory _gateways) public onlyChildChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            add(_gateways[i]);
        }
    }

    function removeGateway(address[] memory _gateways) public onlyChildChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            remove(_gateways[i]);
        }
    }
    function disableGateway(address[] memory _gateways) public onlyChildChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            disable(_gateways[i]);
        }
    }
    function enableGateway(address[] memory _gateways) public onlyChildChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            enable(_gateways[i]);
        }
    }

    function add(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = true;
    }
    function remove(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        delete gateways[_gateway];
    }
    function disable(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = false;
    }
    function enable(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = true;
    }





    function checkGatewayVerify(address _gateway) public view returns(bool){
        require(_gateway != address(0), "Please recheck gateway address.");
        bool temp = gateways[_gateway];
        return temp;
    }





    function setUSDIaddress(address newCoinAddress) public onlyChildChainProxyManager {
        require(newCoinAddress != address(0), "Please recheck new contract address.");
        usdi_addr = newCoinAddress;
        usdiContract = USDI(usdi_addr);
        // usdiContract = IERC20(usdi_addr);
    }

    function getUSDIaddress() public view onlyChildChainProxyManager returns(address) {
        return usdi_addr;
    }




    function getLiquidityTotalAmount() public view onlyChildChainProxyManager returns(uint) {
        return usdiContract.balanceOf(address(this));
    }




    function defaultWarning() public onlyChildChainProxyManager {
        warning = false;
    }



    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Please recheck new Owner address.");
        owner = newOwner;
        emit TransferOwnerAddress(owner);
    }
    function transferChildChainProxyManagership(address newChildChainProxyManager) public onlyChildChainProxyManager {
        require(newChildChainProxyManager != address(0), "Please recheck new ProxyManager address.");
        ChildChainProxyManager = newChildChainProxyManager;
        emit TransferChildChainProxyManagerAddress(ChildChainProxyManager);
    }



    function checkWarning() public view onlyChildChainProxyManager returns(bool) {
        return warning;
    }
}