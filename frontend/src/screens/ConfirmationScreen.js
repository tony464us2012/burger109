import React from 'react'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ConfirmationScreen = ({match}) => {

    const orderId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
   
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, loading, error } = orderCreate

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <>
        <h2 style={{color: 'black'}}>Order #{orderId}</h2>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Thank you {userInfo.name}.</h2>
                            <h2>Your Order has been placed.</h2>
                            <h2>Please allow 30 to 40 minutes for your order to be ready.</h2>
                       
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal</Col>
                                    <Col><p>${order.subtotal}</p></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><p>${order.tax}</p></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col><p>${order.totalprice}</p></Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default ConfirmationScreen
