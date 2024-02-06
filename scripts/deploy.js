const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const entryPoint = await hre.ethers.deployContract("EntryPoint");
  await entryPoint.waitForDeployment();

  const AccountFactory = await hre.ethers.deployContract(
    "SimpleAccountFactory",
    [entryPoint.target]
  );
  await AccountFactory.waitForDeployment();

  const data = {
    FactoryAddress: AccountFactory.target,
    EntryPointAddress: entryPoint.target,
  };

  await writeFileData(JSON.stringify(data));
  console.log(`factory deployed at: ${AccountFactory.target}`);
}

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
