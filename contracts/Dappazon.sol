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
        uint256 Id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);

    event Buy(address buyer, uint256 orderId, uint256 itemId);

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
    // payable builtin modifier in solidity
    function buy(uint256 _Id) public payable {
        // Fetch item
        Item memory item = items[_Id];
        // create order
        Order memory order = Order(block.timestamp, item);
        // save order
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;
        // subtract
        items[_Id].stock = item.stock - 1;
        // event
        emit Buy(msg.sender, orderCount[msg.sender], item.Id);
    }
    // withdraw funds
}
