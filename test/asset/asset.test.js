import {getAssetChainIndex, waitFor, withSnapshot} from '../utils';
import {assetFixtures} from '../common/fixtures/asset';

const { expect } = require("chai");

const setupAsset = withSnapshot(['Asset'], assetFixtures);

describe("Asset.sol", function() {
    it('user create erc721', async function() {
        const {Asset, users, mintAsset} = await setupAsset();
        const tokenId = await mintAsset(users[1].address, 11);
        await waitFor(
            users[0].Asset['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                users[0].address,
                users[0].address,
                tokenId,
                10,
                '0x'
              )
        )
    })
})