import React from 'react';
import { Alert, Image, Nav } from "react-bootstrap";
import emptycartImg from "../images/empty-cart.jpg";

const AlertComponent = () => {
  return (
    <>
      <Alert variant='light'>
        <div className="text-center">
        <h2>Sorry! Your cart is empty</h2>
        <Image fluid src={emptycartImg} />
        <Nav.Link href="/">Click here to choose some delicious Pizzas</Nav.Link>
        </div>
      </Alert>
    </>
  )
}

export default AlertComponent;
