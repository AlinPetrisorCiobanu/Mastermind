import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  return (
    <Container className="d-flex home-design">
      <Col>
        <Row>
          <Col className="text-center" xs={12} md={12}>
            <h1>Master Mind</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={4}></Col>  
          <Col as={Link} to="/login_user" className="menu-option" xs={8} md={4}>
            <h2>Iniciar Sesion</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={4}></Col>  
          <Col as={Link} to="/register_user" className="menu-option" xs={8} md={4}>
            <h2>Registrate</h2>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};