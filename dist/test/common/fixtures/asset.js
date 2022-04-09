"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gemsAndCatalystsFixture = exports.assetFixtures = void 0;
const hardhat_1 = require("hardhat");
const { read, execute, deploy } = hardhat_1.deployments;
const utils_1 = require("../../utils");
const catalysts_1 = __importDefault(require("../../../data/catalysts"));
const gems_1 = __importDefault(require("../../../data/gems"));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const assetFixtures = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("AAA\n");
        // await asset_regenerate_and_distribute(hre);
        const unnamedAccounts = yield (0, hardhat_1.getUnnamedAccounts)();
        const otherAccounts = [...unnamedAccounts];
        const minter = otherAccounts[0];
        otherAccounts.splice(0, 1);
        const { assetBouncerAdmin } = yield (0, hardhat_1.getNamedAccounts)();
        const assetContractAsBouncerAdmin = yield hardhat_1.ethers.getContractAt('AssetV2', assetBouncerAdmin);
        yield (0, utils_1.waitFor)(assetContractAsBouncerAdmin.setBouncer(minter, true));
        const Asset = yield hardhat_1.ethers.getContractAt('AssetV2', minter);
        // const predicate = await ethers.getContractAt('ERC1155_PREDICATE');
        const TRUSTED_FORWARDER = yield hardhat_1.deployments.get('TRUSTED_FORWARDER');
        // const trustedForwarder = await ethers.getContractAt(
        //   'TestMetaTxForwarder',
        //   TRUSTED_FORWARDER.address
        // );
        // Set predicate Asset
        // try {
        //   await waitFor(predicate.setAsset(Asset.address));
        // } catch (e) {
        //   console.log(e);
        // }
        let id = 0;
        const ipfsHashString = '0x78b9f42c22c3c8b260b781578da3151e8200c741c6b7437bafaff5a9df9b403e';
        function mintAsset(to, value, hash = ipfsHashString) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                // Asset to be minted
                const creator = to;
                const packId = ++id;
                const supply = value;
                const rarity = 0;
                const owner = to;
                const data = '0x';
                let receipt;
                try {
                    receipt = yield (0, utils_1.waitFor)(Asset.mint(creator, packId, hash, supply, rarity, owner, data));
                }
                catch (e) {
                    console.log(e);
                }
                const event = (_a = receipt === null || receipt === void 0 ? void 0 : receipt.events) === null || _a === void 0 ? void 0 : _a.filter((event) => event.event === 'TransferSingle')[0];
                if (!event) {
                    throw new Error('no TransferSingle event after mint single');
                }
                return (_b = event.args) === null || _b === void 0 ? void 0 : _b.id;
            });
        }
        function mintMultiple(to, supplies, hash = ipfsHashString) {
            return __awaiter(this, void 0, void 0, function* () {
                const creator = to;
                const packId = ++id;
                const rarity = 0;
                const owner = to;
                const data = '0x';
                const tx = yield Asset.mintMultiple(creator, packId, hash, supplies, rarity, owner, data);
                const receipt = yield tx.wait();
                return receipt.events.find((v) => v.event === 'TransferBatch')
                    .args[3];
            });
        }
        const users = yield (0, utils_1.setupUsers)(otherAccounts, { Asset });
        return {
            Asset,
            users,
            mintAsset,
            mintMultiple,
            // trustedForwarder,
            // predicate,
        };
    });
};
exports.assetFixtures = assetFixtures;
const gemsAndCatalystsFixture = function (isSetupForL2) {
    return __awaiter(this, void 0, void 0, function* () {
        const { assetAttributesRegistryAdmin, gemMinter, deployer, catalystAdmin, } = yield (0, hardhat_1.getNamedAccounts)();
        const L2Prefix = isSetupForL2 ? 'Polygon' : '';
        const assetAttributesRegistryAsRegistryAdmin = yield hardhat_1.ethers.getContractAt(L2Prefix + 'AssetAttributesRegistry', assetAttributesRegistryAdmin);
        const GemsCatalystsRegistry = yield hardhat_1.deployments.get(L2Prefix + 'GemsCatalystsRegistry');
        const DefaultAttributes = yield hardhat_1.deployments.deploy(`DefaultAttributes`, {
            from: deployer,
            log: true,
        });
        const catalystsToAdd = [];
        const gemsToAdd = [];
        for (const catalyst of catalysts_1.default) {
            const doesCatalystExist = yield read(L2Prefix + 'GemsCatalystsRegistry', 'doesCatalystExist', catalyst.catalystId);
            let catalystContract;
            if (!doesCatalystExist) {
                catalystContract = yield deploy(L2Prefix + `Catalyst_${catalyst.symbol}`, {
                    contract: 'Catalyst',
                    from: deployer,
                    log: true,
                    args: [
                        `Sandbox ${catalyst.symbol} Catalysts`,
                        catalyst.symbol,
                        catalystAdmin,
                        catalyst.maxGems,
                        catalyst.catalystId,
                        DefaultAttributes.address,
                        GemsCatalystsRegistry.address,
                    ],
                    skipIfAlreadyDeployed: true,
                });
                catalystsToAdd.push(catalystContract.address);
            }
        }
        for (const gem of gems_1.default) {
            const doesGemExist = yield read(L2Prefix + 'GemsCatalystsRegistry', 'doesGemExist', gem.gemId);
            let gemsContract;
            if (!doesGemExist) {
                gemsContract = yield deploy(L2Prefix + `Gem_${gem.symbol}`, {
                    contract: 'Gem',
                    from: deployer,
                    log: true,
                    args: [
                        `Sandbox ${gem.symbol} Gems`,
                        gem.symbol,
                        gemMinter,
                        gem.gemId,
                        GemsCatalystsRegistry.address,
                    ],
                    skipIfAlreadyDeployed: true,
                });
                gemsToAdd.push(gemsContract.address);
            }
        }
        const currentAdmin = yield read(L2Prefix + 'GemsCatalystsRegistry', 'getAdmin');
        yield execute(L2Prefix + 'GemsCatalystsRegistry', { from: currentAdmin, log: true }, 'addGemsAndCatalysts', gemsToAdd, catalystsToAdd);
        return assetAttributesRegistryAsRegistryAdmin;
    });
};
exports.gemsAndCatalystsFixture = gemsAndCatalystsFixture;
