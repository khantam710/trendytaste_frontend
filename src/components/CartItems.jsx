import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../redux/actions/CartAction";
import { updateQuantity } from "../redux/actions/CartAction";
import ErrorComponent from "./ErrorComponent";

const CartItems = ({ val }) => {
  const inc_payload = {
    ...val,
    quantity: val.quantity + 1,
    price: (val.price / val.quantity) * (val.quantity + 1),
  };

  const dec_payload = {
    ...val,
    quantity: val.quantity > 1 ? val.quantity - 1 : 1,
    price: (val.price / val.quantity) * (val.quantity - 1),
  };

  const handleOver = (e) => {
    e.target.className = "fa-solid fa-trash fa-bounce";
  };

  const handleOut = (e) => {
    e.target.className = "fa-solid fa-trash";
  };

  const dispatch = useDispatch();
  return (
    <>
      {
        <Row className="text-dark item-row bg-white rounded-5 mb-1">
          <Col className="column">
            <img src={val.image} alt={val.name} height={100} width={100} />
          </Col>

          <Col className="column" xs={3}>
            <h5>{val.name}</h5>
          </Col>

          <Col className="column">
            <div className="d-flex align-items-center">
              <Button
                onClick={() => dispatch(updateQuantity(inc_payload))}
                variant="success"
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
              <h6 className="ms-4 me-4">{val.quantity}</h6>
              <Button
                onClick={() => dispatch(updateQuantity(dec_payload))}
                variant="secondary"
              >
                <i className="fa-solid fa-minus"></i>
              </Button>
            </div>
          </Col>

          <Col className="column">
            <h6>Price: ₹{val.price}</h6>
          </Col>
          <Col className="column">
            <h6 style={{ color: val.category === "NON-VEG" ? "red" : "green" }}>
              {val.category}
            </h6>
          </Col>
          <Col className="column">
            <h6 className="size">{val.size}</h6>
          </Col>

          <Col className="column">
            <Button
              variant="danger"
              onClick={() => dispatch(deleteCart(val._id))}
            >
              <i
                className="fa-solid fa-trash"
                onMouseOver={handleOver}
                onMouseOut={handleOut}
              ></i>
            </Button>
          </Col>
        </Row>
      }
    </>
  );
};

export default CartItems;
