import React, { useEffect, useState } from "react";
import Loader from "../components/LoaderComponent";
import ErrorComponent from "../components/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, Button, Image } from "react-bootstrap";
import pizzaBg from "../images/pizza-bg.jpg";
import loginImg from "../images/user.png";
import { loginUser } from "../redux/actions/UserAction";
import SuccessComponent from "../components/SuccessComponent";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.users);
  console.log(error, "error")

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    const user = { email, password };
    dispatch(loginUser(user));
  }

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${pizzaBg})`,
          backgroundSize: "cover",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div className="animate__animated animate__zoomIn" style={{}}>
          <div className="row justify-content-center mt-5">
            <div
              className="mt-5 shadow p-2 mb-5 bg-white bg-dark rounded"
              style={{ maxWidth: "500px" }}
            >
              {loading && <Loader />}
              {error && <ErrorComponent error="Invalid Credentials" />}
              {success && <SuccessComponent success="user logged in successfully" />}
              <h2 style={{ color: "#F4781D" }} className="text-center">
                Login <i className="fa-solid fa-right-to-bracket" style={{fontSize:"22px"}}></i>
              </h2>

              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3 text-center"
                  controlId="formPlaintextEmail"
                >
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 text-center"
                  controlId="formPlaintextPassword"
                >
                  <Col sm="12">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </Col>
                </Form.Group>

                <Col sm="12" className="text-center">
                  <Button className="custom-btn mb-2" onClick={login}>Login</Button>
                </Col>

                <a
                  style={{
                    fontSize: "15px",
                    color: "blue",
                    display: "block",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                  href="/register"
                >
                  Click Here To Register
                </a>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
