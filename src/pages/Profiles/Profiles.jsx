import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updateUser, userDate, userLogout } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Custom_Button } from "../../common/Button/Buttons";
import { deleteUser, list_users, modifyUser } from "../../service/apiCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import { validate } from "../../service/useFul";
import { ToastContainer, toast } from "react-toastify";
import "./Profile.scss";

export const Profiles = () => {
  const navigate = useNavigate();
  const validateToken = useSelector(userDate).credentials;
  const [token, setToken] = useState(false);
  const user = useSelector(userDate).user;
  const [users, setUsers] = useState([]);
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

  //compruebo que hay token y si no le mando al inicio
  useEffect(() => {
    if (validateToken && validateToken.length > 0) {
      setToken(true);
    } else {
      setToken(false);
      navigate("/");
    }
  }, [validateToken]);

  //si el usuario accede y su rol es user o guest le manda a inicio
  useEffect(() => {
    if (user.role === "guest" || user.role === "user") {
      navigate("/")
    }
  }, [user]);

  //traigo de mi base de datos todos los usuarios
  useEffect(() => {
    list_users(validateToken, 1)
      .then((res) => {
        if (res.success) {
          setUsers(res.data.docs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [validateToken]);

  //constante para controlar vistas datos/modificar
  const modifyShows = () => {
    setModifyShow(!modifyShow);
  };

  //guardo datos de los inputs
  const inputHandler = (e) => {
    setModifyData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Row className="container_profiles">
        {users.map((user) => {
          return (
            <div key={user._id} className="user_profile">
              <p>id : {user._id}</p>
              <p>nombre : {user.name}</p>
              <p>appelidos : {user.last_name}</p>
              <p>email : {user.email}</p>
              <p>nombre usuario : {user.nickname}</p>
              <p>Rol : {user.role}</p>
              <p>Activo : {user.is_active?("true"):("false")}</p>
              <p>Confirmado : {user.confirmed?("true"):("false")}</p>
              <p>Master Points : {user.MasterPoints}</p>
            </div>
          );
        })}
      </Row>
    </>
  );
};
