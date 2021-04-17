import React from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useToasts } from "react-toast-notifications";
import { UserStoreContext } from "../context/UserContext";
const schema = yup.object().shape({
  email: yup.string().required("insert email").email("insert email format"),
  password: yup.string().required("insert password").min(3, 'password 3 ตัว'),
});
const LoginPage = () => {
    const { addToast } = useToasts();
    let history = useHistory();
    const userStore = React.useContext(UserStoreContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    // console.log(data);
    try{
        const apiUrl = "https://api.codingthailand.com/api/login";
        const resp = await axios.post(apiUrl, {
          email : data.email,
          password : data.password
        });
        localStorage.setItem('token', JSON.stringify(resp.data));

        //get profile
        const urlProfile = 'https://api.codingthailand.com/api/profile';
        const resProfile = await axios.get(urlProfile, {
            headers: { 
                'Authorization': `Bearer ${resp.data.access_token}` 
            }
          });
        localStorage.setItem('profile', JSON.stringify(resProfile.data.data.user));

        addToast('Login Success', { appearance: 'success'});
        // history.go(0);
        // history.go(0);
        
        //update profile by context
        const profileValue = JSON.parse(localStorage.getItem('profile'));
        userStore.updateProfile(profileValue); 
        history.replace('/');

    }catch(error){
        addToast(error.response.data.message, { appearance: 'error'});
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
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

export default LoginPage;
