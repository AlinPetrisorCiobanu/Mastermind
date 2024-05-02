import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateUser, userDate, userLogout } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Custom_Button } from "../../common/Button/Buttons";
import { deleteUser, modifyUser } from "../../service/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import { validate } from "../../service/useFul";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.scss";

export const Profile = () => {
  const validateToken = useSelector(userDate).credentials;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  let user = useSelector(userDate).user;
  const [modifyShow, setModifyShow] = useState(false);
  const [modifyData, setModifyData] = useState({
    name: "",
    last_name: "",
    email: "",
    nickname: "",
    password: "",
    role: "",
    is_active: "",
    confirmed: "",
    MasterPoints: "",
  });
  const [errorData, setErrorData] = useState({
    nameError: "",
    last_nameError: "",
    emailError: "",
    nicknameError: "",
    passwordError: "",
    roleError: "",
    otherError: "",
  });

  useEffect(() => {
    setToken(validateToken);
  }, [validateToken]);

  useEffect(() => {
    const timer = setTimeout(() => {
      tokenExist(token);
    }, 1000);

    return () => clearTimeout(timer);
  }, [token]);

  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/");
    }
  };

  const delete_user = (token, id) => {
    deleteUser(token, id)
      .then((res) => {
        if (res.success) {
          dispatch(userLogout({ credentials: "" }));
          setToken("");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modifyShows = () => {
    setModifyShow(!modifyShow);
  };

  const inputHandler = (e) => {
    setModifyData((prevState) => ({
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

      setErrorData(prevState => {
        const cleanedErrors = {};
        for (const key in prevState) {
          cleanedErrors[key] = "";
        }
        return cleanedErrors;
      });
    }
  }, [errorData]);

  const validateFields = (data) => {
    const errors = {};
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const error = validate(key, data[key]);
        if (error) {
          errors[key] = error;
        }
      }
    }
  
    return errors;
  };


  const modify_user = (data) => {
    let dataModify = {};

    data.email = data.email.toLowerCase();

    const errors = validateFields(data);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return;
    }

    const isEmpty = (field) => !field.trim();
    const hasErrors = Object.values(errorData).some((error) => error !== "");

    // Verificar y asignar valores si no están vacíos
    if (data.name) dataModify.name = data.name;
    if (data.last_name) dataModify.last_name = data.last_name;
    if (data.email) dataModify.email = data.email;
    if (data.nickname) dataModify.nickname = data.nickname;
    if (data.password) dataModify.password = data.password;
    if (data.role) dataModify.role = data.role;

    // Convertir cadenas a booleanos
    if (data.is_active !== "") {
      dataModify.is_active = data.is_active === "true";
    }

    if (data.confirmed !== "") {
      dataModify.confirmed = data.confirmed === "true";
    }

    // Asignar MasterPoints si no es una cadena vacía
    if (data.MasterPoints) {
      dataModify.MasterPoints = data.MasterPoints;
    }

    modifyUser(token, user.id, dataModify)
      .then((res) => {
        if (res.success) {
          dispatch(updateUser(dataModify));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      className={
        user.role !== "user" && user.role !== "guest"
          ? "profile-design profile-design-admin"
          : "profile-design"
      }
    >
      {token ? (
        <Row className="d-flex justify-content-center">
          {modifyShow ? (
            <Col xs={12} md={8} className="card-design card-modify-design">
              {user.role !== "user" && user.role !== "guest" ? (
                <>
                  <h6>{user.name}</h6>
                  <h6>{user._id}</h6>
                </>
              ) : (
                <h6>{user.name}</h6>
              )}
              <Row className="mt-5">
                <Col xs={12} md={6}>
                  <p>Nombre : </p>
                </Col>
                <Col xs={12} md={6}>
                  <Custom_Input
                    name={"name"}
                    placeholder={user.name}
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.nameError && "errorInput"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <p>Apellidos : </p>
                </Col>
                <Col xs={12} md={6}>
                  <Custom_Input
                    name={"last_name"}
                    placeholder={user.last_name}
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.last_nameError && "errorInput"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <p>Email : </p>
                </Col>
                <Col xs={12} md={6}>
                  <Custom_Input
                    name={"email"}
                    placeholder={user.email}
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.emailError && "errorInput"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <p>Nombre de Usuario : </p>
                </Col>
                <Col xs={12} md={6}>
                  <Custom_Input
                    name={"nickname"}
                    placeholder={user.nickname}
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.nicknameError && "errorInput"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <p>Contraseña : </p>
                </Col>
                <Col xs={12} md={6}>
                  <Custom_Input
                    name={"password"}
                    placeholder={"Contraseña"}
                    handler={inputHandler}
                    handlerError={checkError}
                    custom={errorData.passwordError && "errorInput"}
                  />
                </Col>
              </Row>
              {user.role !== "user" && user.role !== "guest" && (
                <>
                  <Row className="mt-3">
                    <Col xs={12} md={6}>
                      <p>
                        Confirmación ({user.confirmed ? "true" : "false"}) :{" "}
                      </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <Custom_Input
                        name={"confirmed"}
                        placeholder={
                          user.confirmed ? "confirmado" : "no confirmado"
                        }
                        handler={inputHandler}
                        handlerError={checkError}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12} md={6}>
                      <p>Activo ({user.is_active ? "true" : "false"}) : </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <Custom_Input
                        name={"is_active"}
                        placeholder={user.is_active ? "activo" : "eliminado"}
                        handler={inputHandler}
                        handlerError={checkError}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12} md={6}>
                      <p>Rol ({user.role}) : </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <Custom_Input
                        name={"role"}
                        placeholder={user.role}
                        handler={inputHandler}
                        handlerError={checkError}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3 mb-5">
                    <Col xs={12} md={6}>
                      <p>Master Puntos ({user.MasterPoints}) : </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <Custom_Input
                        name={"MasterPoints"}
                        placeholder={`${user.MasterPoints} puntos`}
                        handler={inputHandler}
                      />
                    </Col>
                  </Row>
                </>
              )}
              <Row className="d-flex justify-content-center row-card">
                <Col xs={12} md={12} className="">
                  <Row>
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex justify-content-center button-design"
                    >
                      <Custom_Button
                        name={"Modificar"}
                        clickHandler={() => modify_user(modifyData)}
                        data={[user]}
                      />
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex justify-content-center button-design"
                    >
                      <Custom_Button
                        name={"Cancelar"}
                        clickHandler={modifyShows}
                        data={[token, user._id]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col xs={12} md={8} className="card-design">
              {user.role !== "user" && user.role !== "guest" && (
                <Row className="d-flex justify-content-center row-card row-card-admin">
                  <Col xs={12} md={12} className="">
                    <Row>
                      <Col xs={12} md={6}>
                        <h5>id : </h5>
                      </Col>
                      <Col xs={12} md={6}>
                        <h3>{user._id}</h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
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
                    <Col xs={12} md={6}>
                      <h5>Puntos Master: </h5>
                    </Col>
                    <Col xs={12} md={6}>
                      <h3>{user.MasterPoints}</h3>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {user.role !== "user" && user.role !== "guest" && (
                <>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Confirmado : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{user.confirmed ? "true" : "false"}</h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Semilla : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{user.isSeeded ? "true" : "false"}</h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Activo : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{user.is_active ? "true" : "false"}</h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Rol : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>{user.role}</h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Creado : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>
                            {new Date(user.createdAt).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center row-card">
                    <Col xs={12} md={12} className="">
                      <Row>
                        <Col xs={12} md={6}>
                          <h5>Modificado : </h5>
                        </Col>
                        <Col xs={12} md={6}>
                          <h3>
                            {new Date(user.updatedAt).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              )}
              <Row className="d-flex justify-content-center row-card">
                <Col xs={12} md={12} className="">
                  <Row>
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex justify-content-center button-design"
                    >
                      <Custom_Button
                        name={"Modificar"}
                        clickHandler={modifyShows}
                        data={[user]}
                      />
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className="d-flex justify-content-center button-design"
                    >
                      <Custom_Button
                        name={"Eliminar"}
                        clickHandler={delete_user}
                        data={[token, user._id]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      ) : (
        <></>
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
