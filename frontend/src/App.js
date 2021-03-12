import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import UserListScreen from './screens/UserListScreen'
import OrderScreen from './screens/OrderScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

const stripePromise = loadStripe('pk_test_51IQjuZL3CskvbasWBMNfrSLPF2xBP9mietcH9gbwH7SkVgGMAWIC8dM2V0XnN0U9e9BhVH48Uvu59RCBkImcOAdi00PyTPUtjp')

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-5" >
        <Elements stripe={stripePromise}>
          <Container style={{marginTop: '5%'}} >
            <Route path='/order/:id' component={OrderScreen}  />
            <Route path='/login' component={LoginScreen}  />
            <Route path='/placeorder' component={PlaceOrderScreen}  />
            <Route path='/register' component={RegisterScreen}  />
            <Route path='/profile' component={ProfileScreen}  />
            <Route path='/product/:id' component={ProductScreen}  />
            <Route path='/cart' component={CartScreen}  />
            <Route path='/admin/userList' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/menu' component={MenuScreen} exact />
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </Elements>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
