import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import mojo from "../images/logo.png";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/UserAction";
import { NavDropdown } from "react-bootstrap";
import "../css/NavbarComponent.css";

const NavbarComponent = () => {
  const cartstate = useSelector((state) => state.cart);
  const userdata = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="md"
        className="shadow p-md-2 p-sm-2 mb-4 bg-body rounded ms-2 me-2 sticky-top"
      >
        <Container>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand>
              {/* <Image
                src={mojo}
                className="img-fluid"
                style={{ height: "50px" }}
                fluid
              /> */}Trendy Taste
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleToggleCollapse}
          />

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" in={!isCollapsed}>
            <Nav className="ml-auto">
              {userdata ? (
                <NavDropdown
                  title={`Welcome, ${userdata.data.name}`}
                  id="nav-dropdown-dark-example"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatch(logoutUser())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="d-flex text-decoration-none flex-column">
                  <Button className="p-2 m-2 custom-btn">Login</Button>
                </Link>
              )}
              <Link to={userdata ? "/cart" : "/login"} className="d-flex text-decoration-none flex-column">
                <Button className="p-2 m-2 custom-btn">
                  <i className="fa-solid fa-cart-arrow-down"></i>{" "}
                  {cartstate.cart.length}
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
