const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
require("dotenv").config();

const server = express();
server.use(cors());
server.use(express.json());

// Initialize Web3 connection
const blockchain = new Web3(process.env.ETHEREUM_NODE_URL || "http://127.0.0.1:7545");

// Load private key
const signerKey = process.env.PRIVATE_KEY;
if (!signerKey) {
    throw new Error("PRIVATE_KEY missing from .env");
}
const signerAddress = blockchain.eth.accounts.privateKeyToAccount(signerKey).address;
blockchain.eth.accounts.wallet.add(signerKey);

// Load smart contract
const directoryABI = require("../build/contracts/Directory.json").abi;
const directoryAddress = process.env.CONTRACT_ADDRESS;

const directoryContract = new blockchain.eth.Contract(directoryABI, directoryAddress);

// Fetch all entries
server.get("/entries", async (req, res) => {
    console.log("GET /entries");
    try {
        const total = await directoryContract.methods.totalEntries().call();
        const entries = [];

        for (let idx = 1; idx <= total; idx++) {
            const entry = await directoryContract.methods.fetchEntry(idx).call();
            console.log(entry)
            entries.push({
                id: entry["0"],
                title: entry["1"],
                details: entry["2"],
            });
        }

        res.json(entries);
    } catch (err) {
        console.error("Error fetching entries:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Create a new entry
server.post("/create-entry", async (req, res) => {
    console.log("POST /create-entry", req.body);
    try {
        const { todo, plan } = req.body;

        // Validate inputs
        if (!todo || typeof todo !== "string" || todo.length > 100) {
            console.log("title error")
            return res.status(400).json({ error: "Invalid title (max 100 characters)" });
        }
        if (!plan || typeof plan !== "string" || plan.length > 500) {
            return res.status(400).json({ error: "Invalid details (max 500 characters)" });
        }

        console.log("Creating entry from:", signerAddress);

        const estimatedGas = await directoryContract.methods
            .createEntry(todo, plan)
            .estimateGas({ from: signerAddress });

        const networkGasPrice = await blockchain.eth.getGasPrice();
        console.log("Gas Estimate:", estimatedGas, "Network Gas Price:", networkGasPrice);

        const receipt = await directoryContract.methods
            .createEntry(todo, plan)
            .send({
                from: signerAddress,
                gas: Math.round(estimatedGas * 1.2),
                gasPrice: networkGasPrice,
            });
        console.log({
            success: true,
            txHash: receipt.transactionHash,
        })

        res.json({
            success: true,
            txHash: receipt.transactionHash,
        });
    } catch (err) {
        console.error("Error creating entry:", err);
        res.status(500).json({ error: err.message });
    }
});

const SERVER_PORT = process.env.PORT || 3001;
server.listen(SERVER_PORT, () => {
    console.log(`🔥 API server up at port ${SERVER_PORT}`);
});