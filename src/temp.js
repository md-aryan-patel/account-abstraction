const { ethers, deployments } = require("hardhat");
const { IEntryPoint } = deployments.get("EntryPoint"); // Assuming the deployment is named 'EntryPoint'

async function main() {
  const [deployer] = await ethers.getSigners();

  // Pass IEntryPoint instance to SimpleAccountFactory constructor
  const simpleAccountFactory = await deployments.deploy(
    "SimpleAccountFactory",
    {
      from: deployer.address,
      args: [IEntryPoint.address], // Pass the address of the deployed IEntryPoint contract
    }
  );

  console.log(
    `SimpleAccountFactory deployed at: ${simpleAccountFactory.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
