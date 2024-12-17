const hre = require("hardhat");

async function main() {
  const organChain = await hre.ethers.getContractFactory("OrganChain");
  const contract = await organChain.deploy(); //instance of contract

  await contract.waitForDeployment();
  console.log("Address of contract:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});