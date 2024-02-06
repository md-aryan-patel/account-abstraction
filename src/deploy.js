const hre = require("hardhat");
require("dotenv").config();

const main = async () => {
  const accountFactory = await hre.ethers.deployContract(
    "SimpleAccountFactory",
    [process.env.entrypoint_address]
  );
  await accountFactory.waitForDeployment();
  console.log(`Factory deployed at: ${accountFactory.target}`);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
