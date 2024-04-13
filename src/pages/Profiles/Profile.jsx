import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Profile.scss";

export const Profile = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <Row className="d-flex justify-content-center">
            <Col xs={12} md={6} className="card">
              <h1>Profile</h1>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
