import React from "react";
import { Table } from "react-bootstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { clearAllCart } from "../redux/actions/cartAction";
const CartPage = () => {
  const cart = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>Cart : total {total}</h2>
            <button
              onClick={() => {
                dispatch(clearAllCart());
              }}
              className="btn btn-danger btn-sm mb-3"
            >
              Delete All
            </button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>id</th>
                  <th>name</th>
                  <th>จำนวน</th>
                  <th>ราคา</th>
                  <th>รวม</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
