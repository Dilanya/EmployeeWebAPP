import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserService from "../service/EmployeeService";
import Spinner from "../Assets/Spinner.gif";
import Container from "react-bootstrap/Container";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const userData = await UserService.login(values.email, values.password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);

        setTimeout(() => {
          setLoading(false);
          navigate("/profile");
          window.location.reload();
        }, 5000);
      } else {
        setLoading(false);
        setError(userData.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema} 
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {loading ? (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={Spinner}
                  alt="Loading..."
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            ) : (
              <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                  <h2>Login</h2>
                  {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" style={{ color: 'red' }} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" style={{ color: 'red' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
