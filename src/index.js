const { ethers } = require("hardhat");
const addresses = require("../artifacts/data/contractdata.json");
const { Client, Presets } = require("userop");

require("dotenv").config();
const privateKey = process.env.admin_key;
const provider = new ethers.JsonRpcProvider(process.env.sepolia_network);
const owner = new ethers.Wallet(privateKey, provider);
const entrypointAddress = addresses.EntryPointAddress;
const factoryAddress = addresses.FactoryAddress;
const bundlerRpcUrl = process.env.bundler_rpc;

const main = async () => {
  console.log("factory address: ", factoryAddress);
  // This will create a builder instance which knows how to create user operations based on SimpleAccount.sol smart contract.
  const smartAccount = await Presets.Builder.SimpleAccount.init(
    owner,
    bundlerRpcUrl,
    {
      entryPoint: entrypointAddress,
      factory: factoryAddress,
    }
  );

  console.log("Sender address: ", smartAccount.getSender());

  const client = await Client.init(bundlerRpcUrl, {
    entryPoint: entrypointAddress,
  });

  const result = await client.sendUserOperation(
    smartAccount.execute(smartAccount.getSender(), 0, "0x")
  );

  const event = await result.wait();
  console.log(`Transaction hash: ${event?.transactionHash}`);
};

main().catch((error) => {
  console.log(error);
});
