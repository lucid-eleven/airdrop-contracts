// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract AirdropERC1155 is Ownable, ERC1155 {
  using SafeMath for uint256;

  mapping(uint256 => string) private tokenURI;

  uint256 private _lastTokenType = 0;
  constructor() ERC1155("") { }

  function mintTo(address to, uint256 id, uint256 amount) external onlyOwner {
    require(bytes(tokenURI[id]).length > 0, "INVALID_TOKEN_ID");

    _mint(to, id, amount, "");
  }

  function mintToMultiple(address[] memory to, uint256 id, uint256 amount) external onlyOwner {
    require(bytes(tokenURI[id]).length > 0, "INVALID_TOKEN_ID");

    for(uint i = 0; i < to.length; i++) {
      _mint(to[i], id, amount, "");
    }
  }

  function addNewTokenType(string memory metadataUri) external onlyOwner {
    _lastTokenType++;
    tokenURI[_lastTokenType] = metadataUri;
  }

  function uri(uint256 id)
    public
    view                
    override
    returns (string memory)
  {
    return tokenURI[id];
  }
}