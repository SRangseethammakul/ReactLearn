import React from "react";
import axios from "axios";
import { Spinner, Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
const pageSize = 15;
const HospitalPage = () => {
  const [hospital, setHospital] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, SetError] = React.useState(null);
  const cancelToken = React.useRef(null); //ไม่มีผลต่อการ rerender เรียกว่า useref

  //pagination
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const getData = async (page) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setHospital(resp.data.data);
      setTotal(resp.data.meta.pagination.total);
    } catch (err) {
      console.log(err);
      SetError(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData(page);
    return () => {
      console.log("Exit Product Page");
      cancelToken.current.cancel();
    };
  }, [page]); //ใช้งานเมื่อไอดีเปลี่ยน

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
        <p> เกิดข้ อผิดพลาด </p> <p> {error.response.data.message} </p>{" "}
      </div>
    );
  }
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>hospital</h2>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {hospital.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.code}</td>
                    <td>{item.h_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
          activePage={page}
          itemsCountPerPage={pageSize}
          totalItemsCount={total}
          pageRangeDisplayed={15}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="ก่อน"
          nextPageText="ถัดไป"
          firstPageText="หน้าแรก"
          lastPageText="หน้าสุดท้าย"
        />
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;
