import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { userDate } from "../userSlice";
import { useSelector } from "react-redux";
import "./Profile.scss";
import { Custom_Button } from "../../common/Button/Buttons";

export const Profile = () => {
    const user = useSelector(userDate).user;

  return (
    <Container className="profile-design">
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={8} className="card-design">
          <Row className="d-flex justify-content-center row-card">
            <Col xs={12} md={12} className="">
              <Row>
                <Col xs={12} md={6}>
                  <h5>Nombre : </h5>
                </Col>
                <Col xs={12} md={6}>
                  <h3>{user.name}</h3>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-card">
            <Col xs={12} md={12} className="">
              <Row>
                <Col xs={12} md={6}>
                  <h5>Apellidos : </h5>
                </Col>
                <Col xs={12} md={6}>
                  <h3>{user.last_name}</h3>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-card">
            <Col xs={12} md={12} className="">
              <Row>
                <Col xs={12} md={6}>
                  <h5>Email : </h5>
                </Col>
                <Col xs={12} md={6}>
                  <h3>{user.email}</h3>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-card">
            <Col xs={12} md={12} className="">
              <Row>
                <Col xs={12} md={6}>
                  <h5>Nombre de Usuario : </h5>
                </Col>
                <Col xs={12} md={6}>
                  <h3>{user.nickname}</h3>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-card">
            <Col xs={12} md={12} className="">
              <Row>
                <Col xs={12} md={6} className="d-flex justify-content-center button-design">
                  <Custom_Button name={"Modificar"} />
                </Col>
                <Col xs={12} md={6} className="d-flex justify-content-center button-design">
                <Custom_Button name={"Eliminar"} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
