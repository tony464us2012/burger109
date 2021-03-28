import React from 'react'
import { Row, CardDeck } from 'react-bootstrap'
import Product from '../Product'

const Slider = ({ sliders }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {sliders.map(product => (
                            <Product product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Slider