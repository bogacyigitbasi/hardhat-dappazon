import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import ABI from './abis/Dappazon.json'

// Config
import config from './config.json'
import { wait } from '@testing-library/user-event/dist/utils'

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  // pass sections
  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)
  // pass item
  const [item, setItem] = useState({})
  // set model to render click/non
  const[toggle, setToggle] = useState(false)
  const togglePop = (item) => {
    setItem(item)

    console.log("item is ", item)
    // console.log(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  // window.ethereum by metamask
  const loadData  = async() => {
    // connect
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log("network", network)
    let address;
    // connect to smart contract
    // const dapp = new ethers.Contract(config[31337].contract.address, ABI.abi, provider)
    const dapp = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3", ABI, provider)

    setContract(dapp)

    console.log("addresas", dapp.address)
    console.log("loading the items..")
    const items = []

    for (var i=0; i<9 ; i++){
      const item = await dapp.items(i+1);
      items.push(item)
    }

    console.log(items)

    const electronics = items.filter((item) => item.category == 'electronics')
    setElectronics(electronics)
    const clothing = items.filter((item) => item.category == 'clothing')
    setClothing(clothing)
    const toys = items.filter((item) => item.category == 'toys')
    setToys(toys)
  }

  // render page and call a function(s)
  useEffect(() => {
    loadData()
  },[])
  return (
    <div>
      <Navigation account={account} setAccount={setAccount}/>
      <h2>Dappazon best sellers</h2>

      {electronics && clothing && toys && (
        <>
        <Section title={"Clothing and Jewelery"} items={clothing} togglePop={togglePop}/>

        <Section title={"Electronics"} items={electronics} togglePop={togglePop}/>

        <Section title={"Toys"} items={toys} togglePop={togglePop}/>
      </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={contract} togglePop={togglePop}/>
      )}

    </div>
  );
}

export default App;
