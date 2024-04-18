import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { userDate, userLogout } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Custom_Button } from "../../common/Button/Buttons";
import { deleteUser } from "../../service/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import { Custom_Modal } from "../../common/Modal/Modal";

export const Profile = () => {
  const validateToken = useSelector(userDate).credentials;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const user = useSelector(userDate).user;
  const [modalShow, setModalShow] = useState(false);

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
    deleteUser(token,id)
      .then((res) => {
        if(res.success){
          dispatch(userLogout({ credentials: "" }));
          setToken("");
          navigate("/")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modify_user = (user) => {
    // console.log(user)
    setModalShow(true)
  };

  return (
    <Container className={ user.role !== "user" ? "profile-design profile-design-admin" : "profile-design"}>
      <Custom_Modal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
      />
      {token?(
      <Row className="d-flex justify-content-center">
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
                        {new Date(user.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
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
                        {new Date(user.updatedAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
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
                    clickHandler={modify_user}
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
      </Row>
      ):(
        <>
        
        </>
      )}
    </Container>
  );
};
