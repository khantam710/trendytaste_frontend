import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/UserAction";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../components/LoaderComponent";
import SuccessComponent from "../components/SuccessComponent";
import ErrorComponent from "../components/ErrorComponent";
import registerIcon from "../images/register.png";

const RegisterScreen = () => {
  const paperStyle = { padding: "40px 20px", width: 600, margin: "20px auto" };
  const btnStyle = { marginTop: 10, justifyContent: "center" };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: "",
  };

  const { loading, error, success } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    contact: Yup.string()
      .matches(phoneRegExp, "Enter a valid phone number")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (values.password !== values.confirmPassword) {
      alert("Password do not match");
    } else {
      const user = {
        name: values.name,
        email: values.email,
        contact: values.contact,
        address: values.address,
        password: values.password,
      };
      console.log(user);
      dispatch(registerUser(user));
      resetForm();
    }
  };

  return (
    <>
      {/* <h1>Register Screen</h1> */}
      {loading && <Loader />}
      {success && <SuccessComponent success="User registered successfully." />}
      {error && <ErrorComponent error="Email is already used." />}
      <Grid className="animate__animated animate__zoomIn">
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Typography variant="h4" style={{ color: "#F4781D" }}>
              Register Here <img src={registerIcon} className="img-fluid" />
            </Typography>
            <Typography variant="caption" style={{ fontSize: 15 }}>
              Fill the form to create an account.
            </Typography>
          </Grid>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                style={{ color: "#F4781D !important" }}
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                helperText={<ErrorMessage name="name" />}
                required
              />

              <Field
                as={TextField}
                label="Email"
                type="email"
                name="email"
                fullWidth
                helperText={<ErrorMessage name="email" />}
                required
              />

              <Field
                as={TextField}
                label="Contact number"
                name="contact"
                fullWidth
                helperText={<ErrorMessage name="contact" />}
                required
              />

              <Field
                as={TextField}
                label="Address"
                name="address"
                fullWidth
                helperText={<ErrorMessage name="address" />}
                required
              />

              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                helperText={<ErrorMessage name="password" />}
                required
              />

              <Field
                as={TextField}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                helperText={<ErrorMessage name="confirmPassword" />}
                required
              />

              <Grid container justifyContent="center" style={btnStyle}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="custom-btn text-center"
                >
                  Register Now
                </Button>
              </Grid>

              <Grid container justifyContent="center">
                <Typography variant="caption" style={{ fontSize: 15 }}>
                  <a href="/login" className="text-decoration-none">
                    Already a user? Click here to login
                  </a>
                </Typography>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </>
  );
};

export default RegisterScreen;
