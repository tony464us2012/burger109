import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile } from '../actions/userActions'
import { myOrders, getOrderDetails } from '../actions/orderActions'
import dateFormat from 'dateformat'
import { MY_ORDERS_RESET, ORDER_DETAILS_RESET } from '../actions/types'

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrdersList = useSelector(state => state.myOrders)
    const { loading:loadingOrders, error:errorOrders, orders } = myOrdersList

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading:loadingDetails, error:errorDetails } = orderDetails
    
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
              dispatch(myOrders(userInfo._id))
              setName(userInfo.name)
              setEmail(userInfo.email)
            }
              return () => {
                  dispatch({type: MY_ORDERS_RESET})
                  dispatch({type: ORDER_DETAILS_RESET})
              }

    }, [dispatch, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: userInfo._id, name, email, password}))
        }
    }

    const orderDetailsHandler = (id) => {
        dispatch(getOrderDetails(id))
    }

    return (
        <Row>
            <Col md={3}>
            <h1>User Profile</h1>
            {errorOrders && <Message variant='danger'>{errorOrders}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loadingOrders && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                { message ? <Message variant='danger'>{message}</Message> : ''}
                <Button type='submit' variant='primary'>
                    Update
                </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2 style={{color: 'black'}}>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
                 orders.length === 0 ?  <Message variant='info'>No Orders..</Message> :
                 (
                  <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ORDER #</th>
                                <th>ORDER DATE</th>
                                <th>TOTAL PRICE</th>
                                <th></th>
                            </tr>
                        </thead>
                          {orders.map(order => (
                            <tbody>
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                    <td><p style={{marginTop: '.1rem'}}>${order.totalprice}</p></td>
                                    <td>
                                            <Button className='btn-sm' variant='light'  onClick={() => orderDetailsHandler(order._id)}>Details</Button>
                                    </td>
                                </tr>
                         </tbody>
                          ))}
                    </Table>
                  </>
                )}
                { loadingDetails ? <Loader/> : errorDetails ? <Message variant='danger'>{errorDetails}</Message> : order.length !== 0 ?  (
                    <>
                     <h2 style={{color: 'black'}}>Order #{order._id}</h2>
                    <ListGroup variant='flush'>
                        {order.orderItems.map(item => (
                            <ListGroup.Item variant='light' style={{paddingRight: '2.5rem'}}>
                                <Row>
                                 <Col md={3}>
                                    <h5>{item.name}</h5>
                                 </Col>
                                 <Col md={2}><p>${item.price}</p></Col>
                                </Row>
                                <Row>
                                  <Col md={2}></Col>
                                 {item.large ? <Col md={3}>Large</Col> : ''}
                                 {item.sauce ? <Col md={3}> {item.sauce}</Col> : ''}
                                 {item.burger ? <Col md={3}>Burger: {item.burger}</Col> : ''}
                                 {item.extraPatty ? <Col md={3}>{item.extraPatty}</Col> : ''}
                                 {item.pattySwap ? <Col md={3}>{item.pattySwap}</Col> : ''}
                                 {item.extras ? <Col md={3}>{item.extras.map(extra => <>{extra}</>)}</Col> : ''}
                                 {item.sideSwap ? <Col md={3}>Side: {item.sideSwap}</Col> : ''}
                                 {item.upgradeSide ? <Col md={3}>Side: {item.upgradeSide}</Col> : ''}
                                 {item.fryAddOn ? <Col md={3}>Side Add: {item.fryAddOn}</Col> : ''}
                                </Row>
                                <Row>
                                    {item.instructions ? <Col style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</Col> : '' }
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item variant='light'>
                            <div className="myOrderTotal">
                            <h2>Subtotal</h2>
                            <p>${order.subtotal}</p>
                            </div>
                            <div className="myOrderTotal">
                            <h2>Tax</h2>
                            <p>${order.tax}</p>
                            </div>
                            <div className="myOrderTotal">
                            <h2>Total</h2>
                            <p>${order.totalprice}</p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    </>
                ) : ''}
            </Col>
        </Row>
    )
}

export default ProfileScreen
