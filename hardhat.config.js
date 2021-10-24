/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: process.env.RINKEBY_API_URI,
      accounts: [process.env.RINKEBY_ACCOUNT_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_API_URI,
      accounts: [process.env.MAINNET_ACCOUNT_PRIVATE_KEY]
    },
    matic: {
      chainId: 137,
      url: process.env.MATIC_API_URI,
      accounts: [process.env.MATIC_ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
 