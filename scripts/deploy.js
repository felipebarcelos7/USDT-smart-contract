// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy




  // // Deploy USDIcontract
  // const MainToken = await hre.ethers.getContractFactory("USDI");
  // const main_token = await MainToken.deploy("EXL-USD", "USDI", 18, 5000);
  // await main_token.deployed();
  // console.log("USDIcontract address: " + main_token.address);


  // // Deploy MainBridge contract
  // const MainBrige = await hre.ethers.getContractFactory("MainBridge");
  // const main_bridge = await MainBrige.deploy(main_token.address);
  // await main_bridge.deployed();
  // console.log("MainBridge contract address: " + main_bridge.address);

  // Deploy USDIcontract
  const InvestCoinToken = await hre.ethers.getContractFactory("USDI");
  const investCoin_token = await InvestCoinToken.deploy("InvestCoin USD", "USDI", 9, "100000000000");
  await investCoin_token.deployed();
  console.log("InvestCoin USD contract address: " + investCoin_token.address);
  


  // Deploy MainBridge contract
  const ChildBridge = await hre.ethers.getContractFactory("ChildBridge");
  const child_bridge = await Greeter1.deploy(child_token.address);
  await child_bridge.deployed();
  console.log("ChildBridge contract address: " + child_bridge.address);
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
