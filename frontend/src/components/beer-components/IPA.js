import React from 'react'
import BeerProduct from '../BeerProduct'



const IPA = ({ ipa }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {ipa.map(product => (
                            <BeerProduct product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default IPA