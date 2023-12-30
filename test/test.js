const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await hre.ethers.getContractFactory("USDI");
    const greeter = await Greeter.deploy("InvestCoin USD", "USDI", 9, 100000000000);
    await greeter.deployed();

    const Bridge = await hre.ethers.getContractFactory("MainBridge");
    const bridge = await Bridge.deploy(greeter.address);
    await bridge.deployed();

    const owner = await greeter.getOwner();

    console.log("Owner: " + greeter.address);
    console.log("Bridge: " + bridge.address);

    console.log("Total: " + await greeter.totalSupply());
    console.log("Owner Balance: " + await greeter.balanceOf(owner));
    console.log("");

    await greeter.transfer("0x846B275785d890d2e0b5E0901e30743FC1a393e7", 30000);
    console.log("Total: " + await greeter.totalSupply());
    console.log("Owner Balance: " + await greeter.balanceOf(owner));
    console.log("Customer Balance: " + await greeter.balanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7"));
    console.log("");

    await greeter.transfer(bridge.address, 50000);
    console.log("BridgeContract Balance: " + await greeter.balanceOf(bridge.address))
    console.log("BridgeContract Balance: " + await bridge.getLiquidityTotalAmount())
    console.log("");
    
    await greeter.approve(bridge.address, 1000);
    await bridge.lock("0x846B275785d890d2e0b5E0901e30743FC1a393e7", 1000);
    console.log("Customer Balance: " + await greeter.balanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7"));
    console.log("Bridge Balance: " + await greeter.balanceOf(bridge.address));
    console.log("");

    // await greeter.approve(bridge.address, 10);
    // console.log(await greeter.allowance(owner, bridge.address))


    // await bridge.lock(owner, 50);
    // console.log(await greeter.USDIallowance(owner, bridge.address));
    // console.log(await greeter.USDIallowance(owner, "0x846B275785d890d2e0b5E0901e30743FC1a393e7"));
    // const owner = await greeter.getOwner();
    // expect(await greeter.USDIbalanceOf(owner)).to.equal(20);
    // expect(await greeter.USDItotalSupply()).to.equal(20);

    // await greeter.USDItransfer("0x846B275785d890d2e0b5E0901e30743FC1a393e7", 4);
    // expect(await greeter.USDIbalanceOf(owner)).to.equal(16);
    // expect(await greeter.USDItotalSupply()).to.equal(20);
    // expect(await greeter.USDIbalanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7")).to.equal(4);
    // console.log(await greeter.USDIbalanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7"));

    // await greeter.issue(3);
    // expect(await greeter.USDItotalSupply()).to.equal(23);
    // expect(await greeter.USDIbalanceOf(owner)).to.equal(19);


    // // await greeter.addBlackList("0x846B275785d890d2e0b5E0901e30743FC1a393e7");
    // // await greeter.destroyBlackFunds("0x846B275785d890d2e0b5E0901e30743FC1a393e7");
    // // console.log(await greeter.USDIbalanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7"));
    // // console.log(await greeter.USDItotalSupply());

    // await greeter.issue(15);
    // console.log(await greeter.USDItotalSupply());
    // console.log(await greeter.USDIbalanceOf(owner));

    // await greeter.USDItransfer("0xEE24263bcdb7658a70D0298e1924f5604b5920f6", 2);
    // await greeter.USDItransferFrom("0x846B275785d890d2e0b5E0901e30743FC1a393e7", "0xEE24263bcdb7658a70D0298e1924f5604b5920f6", 3);
    // console.log(await greeter.USDIbalanceOf(owner));
    // console.log(await greeter.USDIbalanceOf("0x846B275785d890d2e0b5E0901e30743FC1a393e7"));
    // console.log(await greeter.USDIbalanceOf("0xEE24263bcdb7658a70D0298e1924f5604b5920f6"));
  });
});
