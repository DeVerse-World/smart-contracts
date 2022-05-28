# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

## Instructions for basic flow (local deploy)
yarn dev (start the node)
yarn compile (compile ABI files)
yarn deployV2-hardhat (deploy the contract, update this address in config.js file in landing-page repo)

## Instructions for basic flow (Rinkeby deploy)
Ref: https://dev.to/emanuelferreira/how-to-deploy-smart-contract-to-rinkeby-testnet-using-infura-and-hardhat-5ddj
Infura: https://infura.io/dashboard/ethereum/9a17d0ac33844bf186f3e705da66b308/settings
Alchemy (more reliable): https://dashboard.alchemyapi.io/apps/pvpkwmw2u467ce9d
yarn compile (compile ABI files)
yarn deployV2-rinkeby
yarn batchTransfer-rinkeby

## Instructions for full-flow 
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat run scripts/deploy.js --network localhost
npx hardhat help
```

UPDATED: With yarn
Unit tests: `yarn test`
Start local blockchain: `yarn dev`

https://remix-ide.readthedocs.io/en/latest/remixd.html
remixd -s /Users/hieuletrung/repos/side_projects/deverse/smart-contracts -u https://remix.ethereum.org
npx hardhat run scripts/deployV2.js --network localhost

yarn dev
yarn compile
yarn deployV2
yarn test

https://github.com/thesandboxgame/sandbox-stats-subgraph/blob/master/package.json
https://dev.to/edge-and-node/building-graphql-apis-on-ethereum-4poa
https://ethereum.org/en/developers/tutorials/the-graph-fixing-web3-data-querying/
https://thegraph.academy/developers/local-development/
https://learning.postman.com/docs/sending-requests/supported-api-frameworks/graphql/
https://medium.com/blockrocket/dapp-development-with-a-local-subgraph-ganache-setup-566a4d4cbb
https://github.com/zestymarket/zesty-graph

## Instructions 

### Start chain node and deploy contracts
ganache-cli -h 0.0.0.0
yarn deployV2-ganache
or
yarn dev
yarn deployV2

Update contract address in asset.ts & subgraph.yaml & landing-page/config.js

((( One of in initial set up
graph init --from-contract 0x5fbdb2315678afecb367f032d93f642f64180aa3 --network localhost --abi artifacts/contracts/v2/Asset.sol/Asset.json --contract-name Asset --index-events
Change entities in schema.graphql
cd AssetSubgraph
Update subgraph.yaml with entities name
Update mapping.ts for event handlers
)))

## Restart graph nodes & deploy subgraph
A common “Gotcha” — If you were to restart your local blockchain, your node’s DB would then become out of sync with the current state of your chain and you
therefore would need to tear down your DB and start again.

Optional: Go to graph-node/docker
Change address in docker-compose.yaml to chain node address

docker-compose down -v;

if [ -d "data" ]
then
echo "Found old data for the graph node - deleting it";
we need to sudo this to remove system locked files  
sudo rm -rf data/;
fi

docker-compose up;

update contract address in subgraph-yaml
graph codegen
graph build
graph remove --node http://127.0.0.1:8020 deverse/AssetSubgraph
graph create --node http://127.0.0.1:8020 deverse/AssetSubgraph
graph deploy deverse/AssetSubgraph --ipfs http://localhost:5001 --node http://127.0.0.1:8020
graph test --node http://127.0.0.1:8020 deverse/AssetSubgraph
http://127.0.0.1:8000/subgraphs/name/deverse/AssetSubgraph

### Run mint transactions

yarn test-localhost # to mock mint
yarn test-ganache
