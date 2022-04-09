import {getAssetChainIndex, waitFor, withSnapshot} from '../utils';
import {assetFixtures} from '../common/fixtures/asset';

const { expect } = require("chai");

const setupAsset = withSnapshot(['Asset'], assetFixtures);

describe("Asset", function() {
    it('user create erc721', async function() {
        const {Asset, users, mintAsset} = await setupAsset();
        const minter = users[0];
        const receiver = users[1];
        const tokenId = await mintAsset(minter.address, 11);
        await waitFor(
            minter.Asset['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                minter.address,
                receiver.address,
                tokenId,
                10,
                '0x'
              )
        );
        const balanceSender = await Asset['balanceOf(address,uint256)'](
            minter.address,
            tokenId
        );
        const balanceReceiver = await Asset['balanceOf(address,uint256)'](
            receiver.address,
            tokenId
        );
        expect(balanceSender).to.be.equal(1);
        expect(balanceReceiver).to.be.equal(10);
        console.log("HERE3");
    })
})
