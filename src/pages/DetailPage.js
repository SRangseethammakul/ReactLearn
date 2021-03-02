import React from "react";
import axios from "axios";
import { Spinner, Card, CardDeck, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
const DetailPage = () => {
  const { id, title } = useParams();
  const history = useHistory();
  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, SetError] = React.useState(null);
  const cancelToken = React.useRef(null); //ไม่มีผลต่อการ rerender เรียกว่า useref
  const getData = async (id) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/course/${id}`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setDetail(resp.data.data);
    } catch (err) {
      console.log(err);
      SetError(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData(id);
    return () => {
      console.log("Exit Product Page");
      cancelToken.current.cancel();
    };
  }, [id]); //ใช้งานเมื่อไอดีเปลี่ยน

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
        <p>เกิดข้อผิดพลาด</p>
        <p>{error.response.data.message}</p>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
        <Button variant="secondary" onClick={() => {
            history.goBack()
        }}>Back</Button>{' '}
          <h2>{title}</h2>
          <div className="row">
            {detail.length > 0 ? (
              <CardDeck>
                {detail.map((item, index) => {
                  return (
                    <div className="col-md-4" key={item.ch_id}>
                      <Card className="mb-4 shadow-sm">
                        <Card.Body>
                          <Card.Title>{item.ch_title}</Card.Title>
                          <Card.Text>
                            {item.ch_dateadd}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">
                            Last updated 3 mins ago
                          </small>
                        </Card.Footer>
                      </Card>
                    </div>
                  );
                })}
              </CardDeck>
            ) : (
              <div className="text-danger mx-auto"> ไม่พบข้อมูล </div>
            )}
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
