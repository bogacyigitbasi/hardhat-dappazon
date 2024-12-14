// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    string public name;

    address public owner;

    constructor() {
        name = "Dappazon";
        owner = msg.sender;
    }

    struct Item {
        uint256 tokenId;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Item) public items;
    //list products

    function list(
        uint256 _tokenId,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {
        Item memory item = Item(
            _tokenId,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        items[_tokenId] = item;
    }

    // buy products

    // withdraw funds
}
