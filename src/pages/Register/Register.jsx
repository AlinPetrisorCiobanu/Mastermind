import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Custom_Input } from "../../common/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { Custom_Button } from "../../common/Button/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, register } from "../../service/apiCalls";
import { userDate, userLogin } from "../userSlice";
import { ToastContainer, toast } from "react-toastify";
import { validate } from "../../service/useFul";
import loading_gif from "../../img/loading.gif";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    last_name: "",
    email: "",
    nickname: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({
    nameError: "",
    last_nameError: "",
    emailError: "",
    nicknameError: "",
    passwordError: "",
    otherError: "",
  });
  const validateToken = useSelector(userDate).credentials;
  const [token , setToken ] = useState("")
  const [loading, setLoading] = useState(false);
  const handleOtherError = (errorMessage) => {
    setErrorData((prevState) => ({
      ...prevState,
      otherError: errorMessage,
    }));
  };

  useEffect(()=>{
    setToken(validateToken)
  },[validateToken])

  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    if(token.length > 20){
      tokenExist(token);
    }
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //chequeo de errores para los inputs
  const checkError = (e) => {
    let error = "";
    error = validate(e.target.name, e.target.value);
    setErrorData((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
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

  const registerHand = (data) => {
    data.email = data.email.toLowerCase();
    const isEmpty = (field) => !field.trim();
    const hasErrors = Object.values(errorData).some((error) => error !== "");
  
    if (!Object.values(data).some(isEmpty) && !hasErrors) {
      setLoading(true);
      register(data)
        .then(() => {
          const dataToLogin = { email: data.email, password: data.password };
          login(dataToLogin)
            .then((res) => {
              dispatch(userLogin({ credentials: res.token, user: res.data }));
              setLoading(false);
            })
            .catch(console.log);
        })
        .catch((err) => {
          setOtherError(err);
        });
    } else {
      handleOtherError(isEmpty(data.email) ? "¡Campos Vacios!" : "¡Hay ERRORES pendientes!");
    }
  };

  return (
    <Container className="register-design">
      {loading ? (
        <Row className="d-flex justify-content-center loading-design">
          <Col xs={12} md={8}>
            <img src={loading_gif} alt="loading gif" />
          </Col>
        </Row>
      ) : (
        <>
          <Row className="d-flex justify-content-center">
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
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.nameError ? "input-error" : ""}
                  />
                </Col>
              </Row>
            </Col>
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
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.last_nameError ? "input-error" : ""}
                  />
                </Col>
              </Row>
            </Col>
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
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.emailError ? "input-error" : ""}
                  />
                </Col>
              </Row>
            </Col>
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
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.nicknameError ? "input-error" : ""}
                  />
                </Col>
              </Row>
            </Col>
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
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.passwordError ? "input-error" : ""}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center row-buttons-register">
            <Col xs={12} md={12}>
              <Row className="d-flex justify-content-center buttons-design">
                <Col xs={9} md={5}>
                  <Row className="d-flex justify-content-center">
                    <Col
                      xs={6}
                      md={5}
                      className="d-flex justify-content-center"
                    >
                      <Row>
                        <Col as={Link} to="/" className="custom_button">
                          Menu
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={6}
                      md={5}
                      className="d-flex justify-content-center"
                    >
                      <Custom_Button
                        name={"Registrate"}
                        clase={"custom_button"}
                        clickHandler={registerHand}
                        data={registerData}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={12}>
                  <Row className="d-flex justify-content-center">
                    <Col
                      xs={6}
                      md={5}
                      className="d-flex justify-content-center"
                    >
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
