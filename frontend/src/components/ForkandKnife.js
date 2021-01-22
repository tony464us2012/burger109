import React from 'react'
import { Row, CardDeck } from 'react-bootstrap'
import Product from '../components/Product'

const ForkandKnife = ({ forkandknifes }) => {


    return (
        <>
            <h3>Fork and Knife</h3>
               <Row>
                    {forkandknifes.map(product => (
                        <CardDeck key={product._id}  style={{margin: '0 .25rem'}}>
                            <Product product={product} />
                        </CardDeck>
                    ))}
                </Row>
        </>
    )
}

export default ForkandKnife