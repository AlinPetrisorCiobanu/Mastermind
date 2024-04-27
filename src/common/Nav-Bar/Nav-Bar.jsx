import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, Link } from "react-router-dom";
import { userDate, userLogout } from "../../pages/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Nav-Bar.scss";

export const Nav_bar = () => {
  const user = useSelector(userDate).user;
  const location = useLocation();
  const dispatch = useDispatch();

  //la función de logout
  const LogOut = () => {
    dispatch(userLogout({ credentials: "" }));
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navBar_Design">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Inicio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-menu">
            <Nav.Link
              as={Link}
              to="/mastermind"
              className={location.pathname === "/mastermind" && "selected"}
            >
              Jugar
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile_user"
              className={location.pathname === "/profile_user" && "selected"}
            >
              Perfil de Usuario
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={location.pathname === "/about" && "selected"}
            >
              Como Jugar
            </Nav.Link>
          </Nav>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link className="master-points">
              Points : {user.MasterPoints}
            </Nav.Link>
            <Nav.Link onClick={()=>LogOut()}>Log-Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
