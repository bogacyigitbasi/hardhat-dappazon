const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID = 1;
const NAME = "gazelle";
const CATEGORY = "shoes";
const IMG ="https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(0.1);
const RATING = 4;
const STOCK = 5;


describe("Dappazon", () => {
  let dappazon;
  let  deployer, buyer;


  beforeEach(async() => {
  // Setup accounts
    [deployer, buyer] = await ethers.getSigners();

    console.log("intial deployer", deployer.address)
    // deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
  })


  describe("Deployment",() => {
    it("Has a name", async () =>{
      const name = await dappazon.name
      // console.log(name)
      expect(await dappazon.name()).to.equal("Dappazon")
    })
    it("Deployer", async () =>{
      expect(await dappazon.owner()).to.equal(deployer.address)
    })
  })

  describe("Listing", ()=>{
    let transaction;
    beforeEach(async()=>{
      transaction = await dappazon.connect(deployer).list(ID, NAME, CATEGORY, IMG,COST,RATING,STOCK, {gasLimit:300000})
      await transaction.wait()
    })
      it("Is item listed properly", async ()=>{
        const it = await dappazon.items(ID)
        let name = it.name
        console.log(name)
        expect(name).to.equal('gazelle')
        expect(it.image).to.equal(IMG)
        expect(it.category).to.equal(CATEGORY)
        expect(it.stock).to.equal(STOCK)
        expect(it.rating).to.equal(RATING)
        expect(it.cost).to.equal(COST)
    })

    it ("Emits List event", () => {
      expect(transaction).to.emit(dappazon, "List")
    })

    // it ("Only owner can list", async () => {
    //   transaction = await dappazon.connect(buyer).list(ID, NAME, CATEGORY, IMG,COST,RATING,STOCK, {gasLimit:300000})
    //   transaction.wait()
    // })

})
})
