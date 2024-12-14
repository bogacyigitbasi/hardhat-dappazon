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

    event List(string name, uint256 cost, uint256 quantity);

    //list products

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can call this function");
        _;
    }

    function list(
        uint256 _tokenId,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
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

        emit List(_name, _cost, _stock);
    }

    // buy products

    // withdraw funds
}
