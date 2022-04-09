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
const utils_1 = require("../utils");
const asset_1 = require("../common/fixtures/asset");
const { expect } = require("chai");
const setupAsset = (0, utils_1.withSnapshot)(['AssetV2'], asset_1.assetFixtures);
describe("Asset", function () {
    it('user create erc721', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { Asset, users, mintAsset } = yield setupAsset();
            const tokenId = yield mintAsset(users[1].address, 11);
            console.log("HERE");
            yield (0, utils_1.waitFor)(users[0].Asset['safeTransferFrom(address,address,uint256,uint256,bytes)'](users[0].address, users[0].address, tokenId, 10, '0x'));
        });
    });
});
