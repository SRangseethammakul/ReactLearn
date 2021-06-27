import React from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
const schema = yup.object().shape({
  name: yup.string().required("insert name"),
  email: yup.string().required("insert email").email("insert email format"),
  password: yup.string().required("insert password").min(3, "password 3 ตัว"),
});
const RegisterPage = () => {
  const { addToast } = useToasts();
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const apiUrl = "https://api.codingthailand.com/api/register";
      const resp = await axios.post(apiUrl, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      addToast(resp.data.message, { appearance: "success" });
      history.replace("/login");
      console.log(resp);
    } catch (error) {
      addToast(error.response.data.errors.email[0], { appearance: "error" });
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  ref={register}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                {errors.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="Email">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  ref={register}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group controlId="Password">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  ref={register}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
