// import React from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder } from "../redux/actions/OrderAction";
// import Loader from "./LoaderComponent";
// import ErrorComponent from "./ErrorComponent";
// import SuccessComponent from "./SuccessComponent";

// const CheckoutComponent = () => {
//   const { loading, error, success } = useSelector((state) => state.orders);
//   const { cartTotal } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   console.log(cartTotal, "cartTotal")

//   const handleToken = (token) => {
//     console.log(token);
//     dispatch(placeOrder({token, cartTotal}));
//   };
//   return (
//     <div>

//       {loading && <Loader />}
//       {error && <ErrorComponent error="something went wrong" />}
//       {success && (
//         <SuccessComponent success="Your order is placed Successfully" />
//       )}

//       <StripeCheckout
//         stripeKey="pk_test_51NQsSqSCf7Y1HCmVrBk6VYuJJfVAC0Mu0bkGvLAXftcZMAfzZ8MftztXxC8GEfu76XYMtyMmP6LBRzRS27FqBVlZ000yzRiD1I"
//         amount={cartTotal * 100}
//         shippingAddress
//         token={handleToken}
//         currency="INR"
//       >
//         <button className="custom-btn">Pay Now</button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default CheckoutComponent;
