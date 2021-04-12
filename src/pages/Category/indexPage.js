import React from "react";
import axios from "axios";
import { Spinner, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
const IndexPage = () => {
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);
  const history = useHistory();
  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(resp.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();
    return () => {
      cancelToken.current.cancel();
    };
  }, []); //ใช้งานเมื่อไอดีเปลี่ยน

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p> เกิดข้ อผิดพลาด </p> <p> {JSON.stringify(error)} </p>{" "}
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <Button
            className="mb-3"
            variant="success"
            onClick={() => history.push("/category/create")}
          >
            Crate
          </Button>
          <h2>หมวดหมู่ข่าว</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>name</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {category.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button className="ml-2" variant="outline-info" onClick={() => history.push(`/category/edit/${item.id}`)}>
                        <BsPencil />
                      </Button>
                      <Button className="ml-2" variant="outline-danger" onClick={async () => {
                        const isConfirm = window.confirm(`ต้องการลบ ${item.name} ?`);
                        if(isConfirm){
                          const resp = await axios.delete(`https://api.codingthailand.com/api/category/${item.id}`);
                          alert(resp.data.message);
                          history.go(0);
                        }
                      }}>
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
