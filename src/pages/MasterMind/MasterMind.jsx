import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDate } from "../userSlice";
import { useEffect, useState } from "react";
import "./MasterMind.scss";
import { Custom_Input } from "../../common/Input/Input";
import chroma from "chroma-js";

export const MasterMind = () => {
  const navigate = useNavigate();
  const validateToken = useSelector(userDate).credentials;
  const [token, setToken] = useState(false);
  const user = useSelector(userDate).user;
  const [show_game, setShowGame] = useState("dificulty");
  // const [show_game, setShowGame] = useState("color");
  const [dificulty, setDificulty] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [nr_color, setNr_color] = useState(0);
  const [color_shows , setColors_shows] = useState([])
  const [colors , setColors] = useState({
    
  })

  //compruebo que hay token y si no le mando al inicio
  useEffect(() => {
    if ((validateToken && validateToken.length > 0) || user.role === "guest") {
      setToken(true);
    } else {
      setToken(false);
      navigate("/");
    }
  }, [validateToken]);

useEffect(()=>{
  let colores = []
  for(let i = 0 ; i<nr_color;i++){
    colores.push(chroma.random().hex())
  }
  setColors_shows(colores)
},[nr_color])

const handler_color = (a) => {
  console.log(a)
}

  return (
    <Container fluid className="master_mind_design">
      {token && (
        <>
          {show_game === "dificulty" ? (
            <Row className="dificulty_design">
              <Col md={12}>
                <Row className="text-center justify-content-center">
                  <Col md={6} className="text_info">
                    <h3>Seleccione la dificultad</h3>
                  </Col>
                </Row>
                <Row className="justify-content-center container_dificulty mt-5">
                  <Col
                    xs={12}
                    className="mt-3"
                    onClick={() => {
                      setDificulty("beginner")
                      setAttempts(10)
                      setNr_color(4)
                    }}
                  >
                    <h3>Principiante</h3>
                  </Col>
                  <Col
                    xs={12}
                    className="mt-3"
                    onClick={() => {
                      setDificulty("easy")
                      setAttempts(10)
                      setNr_color(6)
                    }}
                  >
                    <h3>Facil</h3>
                  </Col>
                  <Col
                    xs={12}
                    className="mt-3"
                    onClick={() => {
                      setDificulty("medium")
                      setAttempts(10)
                      setNr_color(8)
                    }}
                  >
                    <h3>Medio</h3>
                  </Col>
                  <Col
                    xs={12}
                    className="mt-3"
                    onClick={() => {
                      setDificulty("hard")
                      setAttempts(10)
                      setNr_color(10)
                    }}
                  >
                    <h3>Dificil</h3>
                  </Col>
                  <Col
                    xs={12}
                    className="mt-3"
                    onClick={() => {
                      setDificulty("expert")
                      setAttempts(8)
                      setNr_color(10)
                    }}
                  >
                    <h3>Experto</h3>
                  </Col>
                </Row>
                <Row className="justify-content-center mt-5">
                  {dificulty === "beginner" ? (
                    <Col md={8}>
                      <Row className="justify-content-center">
                        <Col md={10} className="text-center">
                          <h5>Principiante</h5>
                        </Col>
                        <Col md={8}>
                          <h6>* 4 Colores a elegir</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 10 intentos para Ganar</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 50 puntos por partida</h6>
                        </Col>
                      </Row>
                    </Col>
                  ) : dificulty === "easy" ? (
                    <Col md={8}>
                      <Row className="justify-content-center">
                        <Col md={10} className="text-center">
                          <h5>Facil</h5>
                        </Col>
                        <Col md={8}>
                          <h6>* 6 Colores a elegir</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 10 intentos para Ganar</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 100 puntos por partida</h6>
                        </Col>
                      </Row>
                    </Col>
                  ) : dificulty === "medium" ? (
                    <Col md={8}>
                      <Row className="justify-content-center">
                        <Col md={10} className="text-center">
                          <h5>Medio</h5>
                        </Col>
                        <Col md={8}>
                          <h6>* 8 Colores a elegir</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 10 intentos para Ganar</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 150 puntos por partida</h6>
                        </Col>
                      </Row>
                    </Col>
                  ) : dificulty === "hard" ? (
                    <Col md={8}>
                      <Row className="justify-content-center">
                        <Col md={10} className="text-center">
                          <h5>Dificil</h5>
                        </Col>
                        <Col md={8}>
                          <h6>* 10 Colores a elegir</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 10 intentos para Ganar</h6>
                        </Col>
                        <Col md={8}>
                          <h6>* 200 puntos por partida</h6>
                        </Col>
                      </Row>
                    </Col>
                  ) : (
                    dificulty === "expert" && (
                      <Col md={8}>
                        <Row className="justify-content-center">
                          <Col md={10} className="text-center">
                            <h5>Experto</h5>
                          </Col>
                          <Col md={8}>
                            <h6>* 10 Colores a elegir</h6>
                          </Col>
                          <Col md={8}>
                            <h6>* 8 intentos para Ganar</h6>
                          </Col>
                          <Col md={8}>
                            <h6>* 250 puntos por partida</h6>
                          </Col>
                        </Row>
                      </Col>
                    )
                  )}
                </Row>
                <Row className="text-center justify-content-center mt-5">
                  {dificulty !== "" && (
                    <Col md={4}>
                      <h3
                        className="boton_game"
                        onClick={() => {
                          setShowGame("color");
                        }}
                      >
                        Elegir Colores
                      </h3>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          ) : show_game === "color" ? (
            <Row className="color_design">
              <Col>
                <Row className="justify-content-center">
                  {color_shows.map((color,i)=>{
                    return(
                     <Col key={i} >
                      <Row>
                        <Col className="text-center" md={12}>color : {i+1}</Col>
                        <Col md={12}>
                          <Custom_Input type={"color"} defaultValue={color} handler={(e)=>handler_color(e)}/>
                        </Col>
                      </Row>
                    
                  </Col> 
                    )
                  })}
                  
                </Row>
              </Col>
            </Row>
          ) : show_game === "game" ? (
            <>
              <h2>Game</h2>
            </>
          ) : (
            show_game ===
            "result"(
              <>
                <h2>Resultado</h2>
              </>
            )
          )}
        </>
      )}
    </Container>
  );
};
