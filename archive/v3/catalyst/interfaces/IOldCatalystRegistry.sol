//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

interface IOldCatalystRegistry {
    function getCatalyst(uint256 assetId) external view returns (bool exists, uint256 catalystId);
}
