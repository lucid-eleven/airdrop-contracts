// SPDX-License-Identifier: None
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AirdropERC721 is Ownable, ERC721 {
  using SafeMath for uint256;

  string public baseURI;

  constructor(
    string memory name,
    string memory symbol,
    string memory inputBaseUri
  ) ERC721(name, symbol) {
    baseURI = inputBaseUri;
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function setBaseURI(string memory newBaseUri) external onlyOwner {
    baseURI = newBaseUri;
  }

  function mintBatch(address[] memory to, uint[] memory tokenIds) public onlyOwner {
    require(to.length == tokenIds.length, "array mismatch");
    require(to.length > 0, "no recipients");

    for(uint i = 0; i < to.length; i++) {
      _safeMint(to[i], tokenIds[i]);
    }
  }

  function mintTo(address recipient, uint tokenId) public onlyOwner {
    _safeMint(recipient, tokenId);
  }
}