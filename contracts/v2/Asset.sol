pragma solidity 0.5.9;

import "./Asset/ERC1155ERC721.sol";
import "hardhat/console.sol";

contract Asset is ERC1155ERC721 {
    function test() external {
        console.log("XYC\n");
    }
}
