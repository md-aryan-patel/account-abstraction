const { ethers } = require("hardhat");
const factoryAbi = require("../artifacts/contracts/samples/SimpleAccountFactory.sol/SimpleAccountFactory.json");
const { Client, Presets } = require("userop");

require("dotenv").config();
const privateKey = process.env.admin_key;
const provider = new ethers.JsonRpcProvider(process.env.sepolia_network);
const owner = new ethers.Wallet(privateKey, provider);

const main = async () => {
  const factoryContract = await ethers.getContractAt(
    factoryAbi.abi,
    process.env.factory_address,
    owner
  );
  const res = await factoryContract.createAccount(
    process.env.admin_address,
    2999
  );
  console.log(res);
};

main().catch((error) => {
  console.log(error);
});
