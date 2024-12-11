const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {
  it("Has a name", async () =>{
    // deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
    const name = await dappazon.name
    console.log(name)
    // expect(await dappazon.name()).to.equal("Dappazon")
  })
})
