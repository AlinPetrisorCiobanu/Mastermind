import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Custom_Input } from "../../common/Input/Input";
import { Link } from "react-router-dom";
import "./Register.scss";
import { Custom_Button } from "../../common/Button/Buttons";

export const Register = () => {
  const registerHand = () => {
    console.log("registro");
  };

  return (
    <Container className="register-design">
      <Row className="d-flex justify-content-center">
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="name">Nombre : </label>
            </Col>
            <Col xs={12} md={8}>
              <Custom_Input
                name={"name"}
                placeholder={"Nombre"}
                type={"text"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={2}></Col>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="last_name">Apellidos : </label>
            </Col>
            <Col xs={12} md={8}>
              <Custom_Input
                name={"last_name"}
                placeholder={"Apellidos"}
                type={"text"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={2}></Col>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="email">Email : </label>
            </Col>
            <Col xs={12} md={8}>
              <Custom_Input
                name={"email"}
                placeholder={"Correo Electronico"}
                type={"Email"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={2}></Col>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="nickname">Nombre de Usuario : </label>
            </Col>
            <Col xs={12} md={8}>
              <Custom_Input
                name={"nickname"}
                placeholder={"Nombre de Usuario"}
                type={"text"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={2}></Col>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={8}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="password">Contraseña : </label>
            </Col>
            <Col xs={12} md={8}>
              <Custom_Input
                name={"password"}
                placeholder={"Contraseña"}
                type={"password"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={0} md={2}></Col>
        <Col xs={12} md={12}>
          <Row className="d-flex justify-content-center buttons-design">
            <Col xs={9} md={5}>
              <Row className="d-flex justify-content-center">
                <Col xs={6} md={5} className="d-flex justify-content-center">
                  <Row>
                    <Col as={Link} to="/" className="custom_button">
                      Menu
                    </Col>
                  </Row>
                </Col>
                <Col xs={6} md={5} className="d-flex justify-content-center">
                  <Custom_Button
                    name={"Registrate"}
                    clase={"custom_button"}
                    clickHandler={registerHand}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12}>
              <Row className="d-flex justify-content-center">
                <Col xs={6} md={5} className="d-flex justify-content-center">
                  <Row>
                    <Col
                      as={Link}
                      to="/login_user"
                      className="custom_button button-register"
                    >
                      Iniciar Session
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
