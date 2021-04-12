import React from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("insert data"),
});
const EditPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  //   const getData = async (id) => {
  //     const resp = await axios.get(
  //       `https://api.codingthailand.com/api/category/${id}`
  //     );
  //     setValue("name", resp.data.name);
  //   };
  //   React.useEffect(() => {
  //     getData(id);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [id]); //ใช้งานเมื่อไอดีเปลี่ยน

  const getData = React.useCallback(async () => {
    const resp = await axios.get(
      `https://api.codingthailand.com/api/category/${id}`
    );
    setValue("name", resp.data.name);
  }, [id, setValue]);
  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]); //ใช้งานเมื่อไอดีเปลี่ยน

  const onSubmit = async (data) => {
    // console.log(data);
    const apiUrl = "https://api.codingthailand.com/api/category";
    const resp = await axios.put(apiUrl, {
      id: id,
      name: data.name,
    });
    alert(resp.data.message);
    history.replace("/category");
    console.log(resp);
  };
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={8}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPage;
