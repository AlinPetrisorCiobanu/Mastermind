import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogout } from "../userSlice";

export const Home = () => {
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const dispatch = useDispatch();

   //la función de logout
   const LogOut = () => {
    dispatch(userLogout({ credentials: "" }));
  };

  return (
    <Container className="d-flex home-design">
      <Col>
        <Row>
          <Col className="text-center" xs={12} md={12}>
            <h1>Master Mind</h1>
          </Col>
        </Row>
        {token ? (
          <>
            <h1>Hola Sr.{user.name}</h1>
            <Row>
              <Col xs={2} md={4}></Col>
              <Col
                onClick={()=>LogOut()}
                className="menu-option"
                xs={8}
                md={4}
              >
                <h2>Log Out</h2>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col xs={2} md={4}></Col>
              <Col
                as={Link}
                to="/login_user"
                className="menu-option"
                xs={8}
                md={4}
              >
                <h2>Iniciar Sesion</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={4}></Col>
              <Col
                as={Link}
                to="/register_user"
                className="menu-option"
                xs={8}
                md={4}
              >
                <h2>Registrate</h2>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Container>
  );
};
