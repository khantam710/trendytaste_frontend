import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const CartTotal = ({ val }) => {
  return (
    <>
      <Row>
        <Card className="p-4">
          <Card.Img className="img-fluid" src={val.image} alt={val.name} />
          <Card.Body>
            <Card.Title>{val.name}</Card.Title>
            <h6>Price:{val.price}</h6>
            <h6>Category:{val.category}</h6>
            <h6>Size:{val.size}</h6>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default CartTotal;
