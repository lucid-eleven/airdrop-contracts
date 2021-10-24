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
  
    const baseUrl = "ipfs://QmWgUHmjLZTBLqvGnSRDQ5wK8CgR41zaSQ7HDUMGavWVsT/" 

    const ERC721AirdropFactory = await ethers.getContractFactory("AirdropERC721");
    const ERC721AirdropContract = await ERC721AirdropFactory.deploy("NAME", "SYMBOL", baseUrl);

    await ERC721AirdropContract.deployed();
  
    console.log("ERC721Airdrop contract address:", ERC721AirdropContract.address);

    // We also save the contract's artifacts and address in the frontend directory
    saveDeploymentData(ERC721AirdropContract);
  }
  
  function saveDeploymentData(ERC721AirdropContract) {
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

    contractAddresses[network.name].ERC721Airdrop = ERC721AirdropContract.address;
    
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify(contractAddresses, undefined, 2)
    );
  
    const ERC721AirdropArtifact = artifacts.readArtifactSync("AirdropERC721");
  
    fs.writeFileSync(
      contractsDir + "/ERC721Airdrop.json",
      JSON.stringify(ERC721AirdropArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });