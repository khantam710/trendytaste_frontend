import React from 'react'
import NavbarComponent from './components/NavbarComponent'
import HomeScreen from './screens/HomeScreen';
import { Provider } from "react-redux";
import {store} from './redux/store';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PaymentComponent from './components/PaymentComponent';
import OrderScreen from './screens/OrderScreen';



const PizzaMain = () => {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/cart" element={<CartScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
          <Route path="/payment" element={<PaymentComponent/>} />
          <Route path="/orders" element={<OrderScreen/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default PizzaMain
