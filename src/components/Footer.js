import React from "react";
import { getVersion } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
const Footer = () => {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.authReducer.version);

  React.useEffect(() => {
    dispatch(getVersion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <footer className="container">
        <p>
          © Company 2017-{new Date().getFullYear()} API Version: {version}
        </p>
      </footer>
    </>
  );
};
export default Footer;
