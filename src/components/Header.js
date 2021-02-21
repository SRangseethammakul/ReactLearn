import React from "react";
import Logo from "./Logo";
import Title from "../styles/title/Title";
import {Button} from '../styles/button/Button'
const Header = () => {
  let companyName = "ACT";
  let companyAddress = <p>Bangkok</p>;
  let num = 10;
  const showMessage = () => {
    return companyName + ".com";
  };
  const isLogin = false;
  const showMe = () => {
    alert("ACT");
  }
  const products = [
    {id : 1, name : "Coke"},
    {id : 2, name : "Pepsi"},
    {id : 3, name : "Est"}
  ];
  return (
    <>
      <Title>Hello</Title>
      <h1>Header {companyName}</h1>
      {companyAddress}
      {num + 100} <br />
      {showMessage()}
      { isLogin && <p>ยินดีต้อนรับ</p>}
      { isLogin === true && (
          <>
          <p>1</p>
          <p>2</p>
          </>
      )}
      {
          isLogin ? <Logo /> : <p>เสียใจด้วย</p>
      }
      <br/>
      <Button primary onClick={showMe}>From style components</Button>
      <button onClick={showMe}>Show Me</button>
      <br/>

      <hr/>
      <ul>
        {
          products.map((product, index) => {
            return (
              <li key={product.id}>{product.name} - {index+1}</li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Header;
