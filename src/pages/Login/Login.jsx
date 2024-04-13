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
import { ToastContainer, toast } from "react-toastify";
import loading_gif from "../../img/loading.gif";
import "./Login.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    user_data: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({
    otherError: "",
  });
  const token = useSelector(userDate).credentials;
  const [loading, setLoading] = useState(false);
  const handleOtherError = (errorMessage) => {
    setErrorData((prevState) => ({
      ...prevState,
      otherError: errorMessage,
    }));
  };

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

  useEffect(() => {
    const lastError = Object.values(errorData)
      .reverse()
      .find((error) => error !== "");
    if (lastError) {
      toast.error(lastError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [errorData]);

  const loginHand = (data) => {
    if (data.user_data !== "" || data.password !== "") {
      setLoading(true)
      let dataToSend = {};
      dataToSend = {
        nickname: data.user_data,
        email: data.user_data,
        password: data.password,
      };
      login(dataToSend)
        .then((res) => {
          dispatch(userLogin({ credentials: res.token, user: res.data }));
          setLoading(false)
        })
        .catch((error) =>{ handleOtherError(error)});
    } else {
      handleOtherError("¡Campos Vacios!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-design">
      {loading ? (
        <Row className="loading-design">
          <Col xs={12} md={6}>
            <img src={loading_gif} alt="loading gif" />
          </Col>
        </Row>
      ) : (
        <>
      <Col xs={12} md={12}>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={7}>
            <Row className="file-input-design">
              <Col xs={12} md={4}>
                <label htmlFor="name">Usuario o Email : </label>
              </Col>
              <Col xs={12} md={8}>
                <Custom_Input
                  placeholder={"Usuario o Email"}
                  name={"user_data"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={7}>
          <Row className="file-input-design">
            <Col xs={12} md={4}>
              <label htmlFor="name">Contraseña : </label>
            </Col>
            <Col xs={12} md={8}>
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
                      <Col as={Link} to="/" className="custom_button">
                        Menu
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={6} md={5} className="d-flex justify-content-center">
                    <Custom_Button
                      name={"Entrar"}
                      clase={"custom_button"}
                      clickHandler={loginHand}
                      data={loginData}
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
                        to="/register_user"
                        className="custom_button button-register"
                      >
                        Registrate
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Container>
  );
};
