const { ethers } = require("hardhat");
const data = require("../artifacts/data/contractdata.json");
const factoryAbi = require("../artifacts/contracts/samples/SimpleAccountFactory.sol/SimpleAccountFactory.json");
const { Client, Presets } = require("userop");

require("dotenv").config();
const privateKey = process.env.admin_key;
const provider = new ethers.JsonRpcProvider(process.env.sepolia_network);
const owner = new ethers.Wallet(privateKey, provider);

const listenCreateAccount = async (factoryContract) => {
  factoryContract.on("CreateAccount", (address) => {
    console.log(`wallet address: ${address}`);
  });
};

const main = async () => {
  const factoryContract = await ethers.getContractAt(
    factoryAbi.abi,
    data.FactoryAddress,
    owner
  );
  await listenCreateAccount(factoryContract);
  const res = await factoryContract.createAccount(
    process.env.admin_address,
    2991
  );
};

main().catch((error) => {
  console.log(error);
});
