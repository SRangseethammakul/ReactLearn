import React from "react";
import {} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
// import { UserStoreContext } from "../context/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  // const [profile, setProfile] = React.useState(null);
  // const userStore = React.useContext(UserStoreContext);
  //redux
  const profileRedux = useSelector((state) => state.authReducer.profile);
  const dispatch = useDispatch();

  // const getProfile = () => {
  //   const profileValue = JSON.parse(localStorage.getItem("profile"));
  //   if (profileValue) {
  //     userStore.updateProfile(profileValue);
  //   }
  // };

  //redux
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  };

  React.useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* old version no context
  const getProfile = () => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      setProfile(profileValue);
    }
  };

  React.useEffect(() => {
    console.log("useeffect navbar");
    getProfile();
  }, []);
  */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    // history.go(0);
    // userStore.updateProfile(null);
    dispatch(updateProfile(null));
  };
  return (
    <>
      <Navbar bg="success" expand="lg">
        <NavLink className="navbar-brand" to="/" exact>
          <img
            src="./logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{" "}
          Suttipong
        </NavLink>
        {/* <Navbar.Brand href="#home">

        
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact activeClassName="active">
              Suttipong HOME
            </NavLink>
            <NavLink className="nav-link" to="/about" activeClassName="active">
              เกี่ยวกับเรา
            </NavLink>
            <NavLink
              className="nav-link"
              to="/product"
              activeClassName="active"
            >
              สินค้า
            </NavLink>
            <NavDropdown
              title="workshop (Pagination + CRUD)"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/hospital");
                }}
              >
                ข้อมูลสถานพยาบาล (Pagination)
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/category");
                }}
              >
                หมวดหมู่ข่าว (CRUD)
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink className="nav-link" to="/upload" activeClassName="active">
              UploadFile
            </NavLink>
            <NavLink className="nav-link" to="/member" activeClassName="active">
              Member
            </NavLink>
          </Nav>

          {profileRedux ? (
            <span className="navbar-text text-white">
              ยินดีต้อนรับ
              {/* {userStore.profile.name} Role :{" "} {userStore.profile.role} */}
              {profileRedux.name} Role : {profileRedux.role}
              <button className="btn btn-danger ml-2" onClick={logout}>
                Log out
              </button>
            </span>
          ) : (
            <>
              <Nav>
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeClassName="active"
                >
                  Login
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeClassName="active"
                >
                  Register
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
