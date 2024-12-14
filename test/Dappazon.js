const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}



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

    beforeEach(async()=>{
      const transaction = await dappazon.connect(deployer).list(1, "gazelle", "shoes", "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg", tokens(1),5,tokens(0.1), {gasLimit:300000})
      await transaction.wait()
    })
    it("Is item listed", async ()=>{
      const it = await dappazon.items(1)
      console.log(it)
      let name = it.name
      console.log(name)
      expect(name).equal('gazelle')
  })
})
})
