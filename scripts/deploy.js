const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const AccountFactory = await hre.ethers.deployContract(
    "SimpleAccountFactory",
    [process.env.entrypoint_address]
  );

  await AccountFactory.waitForDeployment();
  const token = await deploySamleTokenForTest();

  const data = {
    FactoryAddress: AccountFactory.target,
    EntryPointAddress: process.env.entrypoint_address,
    TokenAddress: token.target,
  };

  await writeFileData(JSON.stringify(data));
  console.log(`factory deployed at: ${AccountFactory.target}`);
}

const deploySamleTokenForTest = async () => {
  const token = await hre.ethers.deployContract("AccountAbstractionToken", [
    process.env.admin_address,
  ]);
  await token.waitForDeployment();

  return token;
};

const writeFileData = async (data) => {
  const fs = require("fs");
  return new Promise((resolve, reject) => {
    fs.writeFile(
      "D:/Desktop/account-abstraction/artifacts/data/contractdata.json",
      data,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
