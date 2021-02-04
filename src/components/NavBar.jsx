import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, NavItem, Nav } from "reactstrap";
import StateContext from "../utils/store";

const NavBar = (props) => {
  const { handleLogout } = props;
  
  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store;

  const loggedOut = (
    <>
      <NavItem className="mr-3">
        <Link to="/">
          <Button color="primary">LOG IN</Button>
        </Link>
      </NavItem>
      <NavItem className="mr-3">
        <Link to="/register">
          <Button color="info">SIGN UP</Button>
        </Link>
      </NavItem>
    </>
  );
  const activeSession = (
    <>
      <NavItem className="mr-3">
        <Link to="/logout">
          <Button color="warning" onClick={handleLogout}>
            LOG OUT
          </Button>
        </Link>
      </NavItem>
    </>
  );
  const userNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/user/edit">
          <Button>EDIT PROFILE</Button>
        </Link>
      </NavItem>
      <NavItem className="mr-3">
        <Link to="/orders">
          <Button>ORDERS</Button>
        </Link>
      </NavItem>
    </>
  );
  const cafeNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/menu">
          <Button>MENU</Button>
        </Link>
      </NavItem>
    </>
  );
  const adminNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/admin/cafe/new">
          <Button>ADD CAFE</Button>
        </Link>
      </NavItem>
      <NavItem className="mr-3">
        <Link to="/admin/coffee/new">
          <Button>ADD COFFEE</Button>
        </Link>
      </NavItem>
    </>
  );

  return (
    <header>
      <Navbar color="light" light>
        <Link to="/">
          <img src="Logo.png" alt="Logo" style={{ height: "50px" }} />
        </Link>
        <div>
          <h1>COFFIENDS</h1>
        </div>
        <Nav>
          {!loggedInUser ? loggedOut : <></>}
          {loggedInUser && loggedInUser.role === "user" ? userNav : <></>}
          {loggedInUser && loggedInUser.role === "cafe" ? cafeNav : <></>}
          {loggedInUser && loggedInUser.role === "admin" ? adminNav : <></>}
          {loggedInUser ? activeSession : <></>}
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;
