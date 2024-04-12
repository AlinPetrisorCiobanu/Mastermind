import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Custom_Button } from "../../common/Button/Buttons";
import { Custom_Input } from "../../common/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate, userLogin } from "../userSlice";
import { login } from "../../service/apiCalls";
import { Link } from "react-router-dom";
import "./Login.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    user_data: "",
    password: "",
  });
  const token = useSelector(userDate).credentials;

  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHand = (data) => {
    if (data.user_data !== "" || data.password !== "") {
      let dataToSend = {};
        dataToSend = {
          nickname: data.user_data,
          email: data.user_data,
          password: data.password,
        };
      login(dataToSend)
        .then((res) => {
          dispatch(userLogin({ credentials: res.token, user: res.data }));
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Error: campos vacíos");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-design">
      <Col xs={12} md={12}>
        <Row>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center">
              <Col xs={9} md={5} className="input-design">
                <Custom_Input
                  placeholder={"Usuario o Email"}
                  name={"user_data"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center">
              <Col xs={9} md={5} className="input-design">
                <Custom_Input
                  placeholder={"Contraseña"}
                  name={"password"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={12}>
            <Row className="d-flex justify-content-center buttons-design">
              <Col xs={9} md={5}>
                <Row className="d-flex justify-content-center">
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Row>
                    <Col as={Link} to="/" className="custom_button">Menu</Col>
                    </Row>
                  </Col>
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Custom_Button name={"Entrar"} clase={"custom_button"} clickHandler={loginHand} data={loginData}/>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={12}>
                <Row className="d-flex justify-content-center">
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Row>
                      <Col as={Link} to="/register_user" className="custom_button button-register">Registrate</Col>
                    </Row>
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
