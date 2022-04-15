# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

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

Go to graph-node/docker
Change address in docker-compose.yaml to chain node address
docker-compose up

graph init --from-contract 0x5fbdb2315678afecb367f032d93f642f64180aa3 --network localhost --abi artifacts/contracts/v2/Asset.sol/Asset.json --contract-name Asset --index-events
Change entities in schema.graphql
cd AssetSubgraph
graph codegen
Update subgraph.yaml with entities name
Update mapping.ts for event handlers
graph build
