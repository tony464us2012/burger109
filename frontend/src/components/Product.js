import React, { useState } from 'react'
import {Card} from 'react-bootstrap'
import ProductModal from './Modal'

const Product = ({ product }) => {
    const [modalShow, setModalShow] = useState(false);

  
    return (
        <>
            <a  onClick={() => setModalShow(true)}>
                <Card className='my-3 p-3 rounded card' style={{width: '18rem'}} >
                        <Card.Img src={product.image} variant='top' />
                    <Card.Body>
                            <Card.Title as='div'><strong className='title-text'>{product.name}</strong></Card.Title>
                        <Card.Text as='h6'> ${product.price} </Card.Text>
                        {/* <Card.Text as='h6'> {product.description} </Card.Text> */}
                    </Card.Body>
                </Card>
            </a>
            <ProductModal show={modalShow} onHide={() => setModalShow(false)} productId={product._id} />
        </>
    )
}

export default Product
