import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Login.scss";
import { Custom_Button } from "../../common/Button/Buttons";
import { Custom_Input } from "../../common/Input/Input";

export const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center login-design">
      <Col xs={12} md={12}>
        <Row>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center">
              <Col xs={9} md={5} className="input-design">
                <Custom_Input placeholder={"Usuario o Email"}/>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center">
              <Col xs={9} md={5} className="input-design">
                <Custom_Input placeholder={"Contraseña"}/>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center buttons-design">
              <Col xs={9} md={5}>
                <Row className="d-flex justify-content-center">
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Custom_Button name={"Menu"} clase={"custom_button"} />
                  </Col>
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Custom_Button name={"Entrar"} clase={"custom_button"} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={12}>
                <Row className="d-flex justify-content-center">
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Custom_Button name={"Register"} clase={"custom_button button-register"}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
