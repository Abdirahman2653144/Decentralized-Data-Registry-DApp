# Decentralized Data Registry DApp

A decentralized application for storing and managing records on the Ethereum blockchain. Built for CN6035 Mobile & Distributed Systems module.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MetaMask browser extension
- Ganache (for local development) or access to an Ethereum testnet

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd decentralized-data-registry
```

2. Install dependencies:

```bash
npm install
cd frontend
npm install
cd ..
```

3. Start Ganache (for local development):

- Download and install Ganache from https://www.trufflesuite.com/ganache
- Start Ganache and note the RPC server address (usually http://127.0.0.1:7545)

4. Configure MetaMask:

- Open MetaMask and connect to Ganache network
- Import an account from Ganache using its private key
- Ensure you have some test ETH in your account

5. Deploy the smart contract:

```bash
truffle migrate --reset
```

Note the contract address after deployment and update it in the `.env` file.

6. Create a `.env` file in the root directory:

```
ETHEREUM_NODE_URL=http://127.0.0.1:7545
CONTRACT_ADDRESS=<your-contract-address>
PORT=3001
```

## Running the Application

1. Start the backend server:

```bash
npm run server
```

2. In a new terminal, start the frontend:

```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Using the Application

1. Connect MetaMask:

   - Click "Connect" in MetaMask when prompted
   - Select your account

2. Add a Record:

   - Fill in the name and description
   - Click "Add Record"
   - Confirm the transaction in MetaMask

3. View Records:
   - Records will automatically load and display
   - Each record shows its ID, name, and description

## Converting to Other Use Cases

To convert this DApp for other use cases (e.g., voting, task management):

1. Modify the smart contract (`Registry.sol`):

   - Update the Record struct with new fields
   - Add new functions for specific operations

2. Update the backend API:

   - Modify the API endpoints to handle new data structures
   - Add new routes for specific operations

3. Update the frontend:
   - Modify the form fields
   - Update the record display
   - Add new UI components for specific operations

## Troubleshooting

- If MetaMask connection fails, ensure you're on the correct network
- If transactions fail, check if you have enough ETH in your account
- If the backend fails to start, check if the contract address is correct
- If the frontend can't connect to the backend, ensure both servers are running

## License

MIT
