import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/actions/CartAction";
import CartItems from "../components/CartItems";
import Loader from "../components/LoaderComponent";
import ErrorComponent from "../components/ErrorComponent";
import AlertComponent from "../components/AlertComponent";
import CartTotal from "../components/CartTotal";
import {checkout} from "../redux/actions/CartAction"

const CartScreen = () => {
  const { cart, error, loading, cartTotal } = useSelector((state) => state.cart);
  const cartQty = cart.length;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
    // console.log(cart,"cart")
  }, []);

  const userData = JSON.parse(localStorage.getItem("currentUser"))
  console.log(userData, "userData")

  const payload = {
    amount: cartTotal,
    userID: userData?.data?._id, // Use optional chaining to handle possible null/undefined values
    email: userData?.data?.email, // Use optional chaining to handle possible null/undefined values
    name: userData?.data?.name, // Use optional chaining to handle possible null/undefined values
  };


  const orderHandler = (payload) => {
    dispatch(checkout(payload))
  }

  return (
    <>
      <div className="container">
      <div className="m-2">
        <h1 className="mb-md-4 mb-sm-2 text-center">Your order</h1>
        {cartQty === 0 ? (
          <AlertComponent />
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              {cart.map((val, index) => (
                <CartItems val={val} key={index} />
              ))}
            </div>
            <div className="col-md-4">
              <span className="" style={{ color: "#F4781D", fontSize:"28px" }}>
                GrandTotal:{cartTotal}/-
              </span>
              {/* <CheckoutComponent GrandTotal={cartTotal} /> */}
              <button className="btn custom-btn m-1" onClick={() =>orderHandler(payload)}>
                Place Order
              </button>
              {cart.map((val, index) => (
                <CartTotal val={val} key={index} />
              ))}
            </div>
          </div>
        )}
    </div>
      </div>
    </>
  );
};

export default CartScreen;
