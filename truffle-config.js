require("dotenv").config(); // Ensure you have dotenv installed
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777",
        },
        sepolia: {
            provider: () =>
                new HDWalletProvider(
                    process.env.PRIVATE_KEY, // Use your private key from .env file
                    "https://blockchain.googleapis.com/v1/projects/printable-454915/locations/asia-east1/endpoints/ethereum-sepolia/rpc?key=AIzaSyCHQ9B0jbFfKotLCqzOXEzXZEbV73HUAVU"
                ),
            network_id: 11155111, // Sepolia network id
            gas: 4465030,
        },
    },
    compilers: {
        solc: {
            version: "0.8.0",
        },
    },
};