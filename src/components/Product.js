import { useEffect, useState, BigNumber } from 'react'
import { ethers, Signer } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const tokens = (n) => {
  console.log("Input:", n); // Check the value of n
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
const Product = ({ item, provider, account, dappazon, togglePop }) => {

  console.log("itemasd",item.cost)
  const buyHandler = async() => {
    const signer = await provider.getSigner();
    //buy
    // let amount_wei = new BigNumber(item.price).shiftedBy(18).toString();
    console.log(item.price)
    let transaction = await dappazon.connect(signer).buy(item.id, {value: item.cost, gasLimit:3000000})
    await transaction.wait()
  }
  return (
    <div className="product">
        <div className='product__details'>
          <div className='product__image'>
            <img src={item.image} alt='Product'></img>
          </div>
          <div className='product__overview'>
            <h1>{item.name} </h1>

            <Rating value={item.rating}/>
            <hr></hr>

            <p>{item.address}</p>

            <h2>{item.price} ETH</h2>
            <hr/>
            <p> {item.description}</p>

            <div className='product__order'>
                <h1>
                  {item.price} ETH
                </h1>

                <p>
                  FREE DELIVERY <br/>
                  <strong>
                    {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric'})}
                  </strong>
                </p>

                {item.stock > 0? (<p> In Stock</p>):(<p>Out of Stock</p>)}

                <button className='product__buy' onClick={buyHandler}>
                  Buy Now
                </button>

                <p><small>Ships from</small>Dappazon</p>
                <p><small>Sold by</small>Dappazon</p>
            </div>

          </div>
        </div>
    </div >
  );
}

export default Product;