import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { userDate, userLogout } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Custom_Button } from "../../common/Button/Buttons";
import { deleteUser } from "../../service/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import "./Profile.scss";

export const Profile = () => {
  const validateToken = useSelector(userDate).credentials;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const user = useSelector(userDate).user;
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

  const modify_user = (data) => {
    /*
    name: "",
    last_name: "",
    email: "",
    nickname: "",
    password: "",
    role: "",
    is_active: "",
    confirmed: "",
    MasterPoints: "",
    */
    let dataModify = {};
    data.name !== "" && (dataModify.name = data.name);
    data.last_name !== "" && (dataModify.last_name = data.last_name);
    data.email !== "" && (dataModify.email = data.email);
    data.nickname !== "" && (dataModify.nickname = data.nickname);
    data.password !== "" && (dataModify.password = data.password);
    data.role !== "" && (dataModify.role = data.role);

    if(data.is_active !== ""){
      if(data.is_active === "true"){
        dataModify.is_active = true
      }else if(data.is_active === "false"){
        dataModify.is_active = false
      }else{
      }
    }

    if(data.confirmed !== ""){
      if(data.confirmed === "true"){
        dataModify.confirmed = true
      }else if(data.confirmed === "false"){
        dataModify.confirmed = false
      }else{
      }
    }

    data.MasterPoints !== "" && (dataModify.MasterPoints = data.MasterPoints);

    console.log(dataModify);
  };

  user.role = "admin";

  return (
    <Container
      className={
        user.role !== "user"
          ? "profile-design profile-design-admin"
          : "profile-design"
      }
    >
      {token ? (
        <Row className="d-flex justify-content-center">
          {modifyShow ? (
            <Col xs={12} md={8} className="card-design">
              {user.role !== "user" ? (
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
                  />
                </Col>
              </Row>
              {user.role !== "user" && (
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
                        placeholder={user.confirmed ? "confirmado" : "no confirmado"}
                        handler={inputHandler}
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
                        placeholder={user.is_active ? ("activo") : ("eliminado")}
                        handler={inputHandler}
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
              {user.role !== "user" && (
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
              {user.role !== "user" && (
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
    </Container>
  );
};
