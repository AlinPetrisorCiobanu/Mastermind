import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogin, userLogout } from "../userSlice";
import { useEffect, useState } from "react";
import "./Home.scss";

export const Home = () => {
  const validateToken = useSelector(userDate).credentials;
  const [token , setToken ] = useState(false)
  const user = useSelector(userDate).user;
  const dispatch = useDispatch();

  useEffect(()=>{
    if (validateToken && validateToken.length > 0) {
      setToken(true);
    } else {
      setToken(false);
    }
  },[validateToken])

  if(token){
    setTimeout(() => {
     LogOut();
   }, 6 * 60 * 60 * 1000); 
   }

   //la función de logout
   const LogOut = () => {
    setToken(false)
    dispatch(userLogout({ credentials: "" }));
  };

  const guest = () => {
    const guest = {
      _id:"guest",
      name:"invitado",
      last_name:"",
      email:"",
      nickname:"",
      role:"guest"
    }
    dispatch(userLogin({ credentials: "token_guest", user: guest }));
  }

  return (
    <Container className="d-flex home-design">
      <Col>
        <Row>
          <Col className={token?("text-center master-2-design"):("text-center master-design")} xs={12} md={12}>
            <h1>Master Mind</h1>
          </Col>
        </Row>
        {token ? (
          <>
            <h4 className="text-center">Hola {user.name}</h4>
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/mastermind" className="menu-option" xs={8} md={4}>
                <h2>Jugar</h2>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/profile_user" className="menu-option" xs={8} md={4}>
                <h2>Perfil de Usuario</h2>
              </Col>
            </Row>
            {user.role === "admin" && (
              <Row className="d-flex justify-content-center">
              <Col as={Link} to="/profile_admin_users" className="menu-option" xs={8} md={4}>
                <h2>Perfil de Usuario</h2>
              </Col>
            </Row>
            )}
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/about" className="menu-option" xs={8} md={4}>
                <h2>Como Jugar</h2>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/" onClick={()=>LogOut()} className="menu-option" xs={8} md={4}>
                <h2>Log Out</h2>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/login_user" className="menu-option" xs={9} md={4}>
                <h2>Iniciar Sesion</h2>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col as={Link} to="/register_user" className="menu-option" xs={9} md={4}>
                <h2>Registrate</h2>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col className="menu-option" onClick={()=>guest()} xs={9} md={4}>
                <h2>Invitado</h2>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Container>
  );
};
