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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSnapshot = exports.evmRevertToInitialState = exports.getAssetChainIndex = exports.setupUser = exports.setupUsers = exports.waitFor = exports.expectEventWithArgsFromReceipt = exports.expectEventWithArgs = exports.expectReceiptEventWithArgs = exports.findEvents = exports.cubeRoot6 = exports.toWei = exports.recurseTests = exports.setNextBlockTime = exports.getTime = exports.increaseTime = exports.mine = void 0;
/* eslint-disable mocha/no-exports */
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const hardhat_1 = require("hardhat");
function mine() {
    return __awaiter(this, void 0, void 0, function* () {
        yield hardhat_1.ethers.provider.send('evm_mine', []);
    });
}
exports.mine = mine;
function increaseTime(numSec, callMine = true) {
    return __awaiter(this, void 0, void 0, function* () {
        // must do something (mine, send a tx) to move the time
        yield hardhat_1.ethers.provider.send('evm_increaseTime', [numSec]);
        if (callMine)
            yield mine();
    });
}
exports.increaseTime = increaseTime;
function getTime() {
    return __awaiter(this, void 0, void 0, function* () {
        const latestBlock = yield hardhat_1.ethers.provider.getBlock('latest');
        return latestBlock.timestamp;
    });
}
exports.getTime = getTime;
function setNextBlockTime(time, callMine = false) {
    return __awaiter(this, void 0, void 0, function* () {
        // must do something (mine, send a tx) to move the time
        yield hardhat_1.ethers.provider.send('evm_setNextBlockTimestamp', [time]);
        if (callMine)
            yield mine();
    });
}
exports.setNextBlockTime = setNextBlockTime;
function recurseTests(test) {
    /* eslint-disable mocha/no-setup-in-describe */
    if (test.subTests) {
        describe(test.title, function () {
            if (test.subTests) {
                for (const subTest of test.subTests) {
                    recurseTests(subTest);
                }
            }
        });
    }
    else {
        it(test.title, test.test);
    }
    /* eslint-enable mocha/no-setup-in-describe */
}
exports.recurseTests = recurseTests;
function toWei(number) {
    return bignumber_1.BigNumber.from(number).mul('1000000000000000000');
}
exports.toWei = toWei;
function cubeRoot6(bigNum) {
    const DECIMALS_18 = bignumber_1.BigNumber.from(1).mul('1000000000000000000');
    const a = bigNum.mul(DECIMALS_18);
    const base = bignumber_1.BigNumber.from(2);
    const root = bignumber_1.BigNumber.from(3);
    let tmp = a.add(base).div(root);
    let c = a;
    while (tmp.lt(c)) {
        c = tmp;
        const tmpSquare = tmp.mul(tmp);
        const numerator = a.div(tmpSquare).add(tmp.mul(base));
        tmp = numerator.div(root);
    }
    return c;
}
exports.cubeRoot6 = cubeRoot6;
function findEvents(contract, event, blockHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = contract.filters[event]();
        return yield contract.queryFilter(filter, blockHash);
    });
}
exports.findEvents = findEvents;
function expectReceiptEventWithArgs(receipt, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!receipt.events) {
            throw new Error('no events');
        }
        for (const event of receipt.events) {
            if (event.event === name) {
                if (!event.args) {
                    throw new Error('event has no args');
                }
                return event;
            }
        }
        throw new Error('no matching events');
    });
}
exports.expectReceiptEventWithArgs = expectReceiptEventWithArgs;
function expectEventWithArgs(contract, receipt, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield findEvents(contract, event, receipt.blockHash);
        if (events.length == 0) {
            throw new Error('no events');
        }
        if (!events[0].args) {
            throw new Error('event has no args');
        }
        return events[0];
    });
}
exports.expectEventWithArgs = expectEventWithArgs;
function expectEventWithArgsFromReceipt(contract, receipt, event) {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield findEvents(contract, event, receipt.blockHash);
        if (events.length == 0) {
            throw new Error('no events');
        }
        if (!events[0].args) {
            throw new Error('event has no args');
        }
        return events[0];
    });
}
exports.expectEventWithArgsFromReceipt = expectEventWithArgsFromReceipt;
function waitFor(p) {
    return p.then((tx) => tx.wait());
}
exports.waitFor = waitFor;
function setupUsers(addresses, contracts) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [];
        for (const address of addresses) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const user = { address };
            for (const key of Object.keys(contracts)) {
                user[key] = contracts[key].connect(yield hardhat_1.ethers.getSigner(address));
            }
            users.push(user);
        }
        return users;
    });
}
exports.setupUsers = setupUsers;
function setupUser(address, contracts) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield setupUsers([address], contracts);
        return users[0];
    });
}
exports.setupUser = setupUser;
function getAssetChainIndex(id) {
    // js bitwise & operands are converted to 32-bit integers
    const idAsHexString = ethers_1.utils.hexValue(id);
    const slicedId = Number('0x' + idAsHexString.slice(48, 56));
    const SLICED_CHAIN_INDEX_MASK = Number('0x7F800000');
    return (slicedId & SLICED_CHAIN_INDEX_MASK) >>> 23;
}
exports.getAssetChainIndex = getAssetChainIndex;
function evmRevertToInitialState() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Revert to initial snapshot, calling reset');
        // This revert the evm state.
        yield hardhat_1.network.provider.request({
            method: 'hardhat_reset',
            params: [hardhat_1.network.config],
        });
    });
}
exports.evmRevertToInitialState = evmRevertToInitialState;
function withSnapshot(tags = [], func = () => __awaiter(this, void 0, void 0, function* () {
    return {};
})) {
    return hardhat_1.deployments.createFixture((env, options) => __awaiter(this, void 0, void 0, function* () {
        // TODO: This has problems with solidity-coverage, when the fix that we can use it
        // TODO: We need a way to revert to initial state!!!
        //  await evmRevertToInitialState();
        yield hardhat_1.deployments.fixture(tags, {
            fallbackToGlobal: false,
            keepExistingDeployments: false,
        });
        return func(env, options);
    }));
}
exports.withSnapshot = withSnapshot;
