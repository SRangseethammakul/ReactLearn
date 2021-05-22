import React from "react";
import axios from "axios";
import { Table, Image, Badge, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

//redux
import { addToCart } from "../redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, SetError] = React.useState(null);
  const cancelToken = React.useRef(null); //ไม่มีผลต่อการ rerender เรียกว่า useref

  //redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        "https://api.codingthailand.com/api/course",
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setProduct(resp.data.data);
    } catch (err) {
      console.log(err);
      SetError(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();
    return () => {
      console.log("Exit Product Page");
      cancelToken.current.cancel();
    };
  }, []);

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

  const addCart = (product) => {
    // console.log(product);
    const item = {
      id: product.id,
      name: product.title,
      price: product.view, //assume to price
      qty: 1,
    };
    //call action
    dispatch(addToCart(item, cart));
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>Product</h2>
          {
            total > 0 && <h4> ซื้อแล้ว {total} .</h4>
          }
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>course Name</th>
                <th>course Description</th>
                <th>Date Create</th>
                <th>View</th>
                <th>img</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.detail}</td>
                    <td>
                      {format(new Date(item.date), "dd MMMM yyyy", {
                        locale: th,
                      })}
                    </td>
                    <td>
                      <Badge pill variant="primary">
                        {item.view}
                      </Badge>
                    </td>
                    <td>
                      <Image
                        src={item.picture}
                        thumbnail
                        alt={item.title}
                        width={100}
                      />
                    </td>
                    <td>
                      <Link to={`/detail/${item.id}/title/${item.title}`}>
                        <BsEyeFill />
                      </Link>
                      <button
                        onClick={() => addCart(item)}
                        className="btn btn-outline-success ml-2"
                      >
                        add to cart
                      </button>
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

export default ProductPage;
