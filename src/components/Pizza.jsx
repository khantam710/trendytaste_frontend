import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { useSelector,useDispatch } from "react-redux";
import { addtoCart } from "../redux/actions/CartAction";

const Pizza = ({ val }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("small");

  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('currentUser'))
  console.log(userData, "userData")
  const payload = {
    id: val._id,
    price: val.price[0][size] * quantity,
    quantity: quantity,
    size: size,
    userID: userData? userData._id : "" // Using optional chaining to access nested properties safely
  };
  
  

  // Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded text-center" style={{cursor:"pointer"}}>
      <div onClick={handleShow}>
        <h1 className="headingSize20">{val.name}</h1>
        <Image 
        src={val.image}
        alt={val.name}
        className="img-fluid"
        // style={{height:280,width:280}}
        fluid
        />
      </div>

      <div className="d-flex">
        <div className="w-100 m-1">
          <p>Sizes:</p>
          <select
            className="form-control"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          >
            {val.size && val.size.length > 0 ? (
              val.size.map((size, index) => (
                <option value={size} key={index}>
                  {size}
                </option>
              ))
            ) : (
              <option value="">No Variants Available</option>
            )}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity:</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="d-flex">
        <div className="w-100 m-1">
          <h1 className="headingSize20 mt-2">Price: ₹{val.price[0][size] * quantity}</h1>
        </div>
        <div className="w-100 m-1">
          <button className="custom-btn btn" onClick={() => dispatch(addtoCart(payload))}>ADD TO CART</button>
        </div>
      </div>

      {/* Modal  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{val.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={val.image} alt={val.name} className="img-fluid" />
          <p>{val.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="custom-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pizza;
