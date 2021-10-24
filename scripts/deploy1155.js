// This is a script for deploying your contracts. You can adapt it to deploy

const { network } = require("hardhat");

// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const ERC1155AirdropFactory = await ethers.getContractFactory("AirdropERC1155");
    const ERC1155AirdropContract = await ERC1155AirdropFactory.deploy();

    await ERC1155AirdropContract.deployed();

    console.log("ERC1155Airdrop contract address:", ERC1155AirdropContract.address);

    // We also save the contract's artifacts and address in the frontend directory
    saveDeploymentData(ERC1155AirdropContract);
  }
  
  function saveDeploymentData(ERC1155AirdropContract) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../deploy";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    var contractAddressesJson = fs.readFileSync(
      contractsDir + "/contract-address.json",
      { flag: "a+" }
    );

    contractAddresses = contractAddressesJson.length == 0 ? {} : JSON.parse(contractAddressesJson);

    contractAddresses[network.name].ERC1155Airdrop = ERC1155AirdropContract.address;
    
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify(contractAddresses, undefined, 2)
    );
  
    const ERC1155AirdropArtifact = artifacts.readArtifactSync("AirdropERC1155");
  
    fs.writeFileSync(
      contractsDir + "/ERC1155Airdrop.json",
      JSON.stringify(ERC1155AirdropArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });