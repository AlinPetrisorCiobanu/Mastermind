import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from 'react';
import { Custom_Input } from '../Input/Input';

export const Custom_Modal = ({show , onHide , user }) => {

  const [modifyData, setModifyData] = useState({
    name: "",
    last_name: "",
    email: "",
    nickname: "",
    password: "",
  });
  
  const inputHandler = (e) => {
    console.log(e.target.name)
    setModifyData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const props = { show, onHide };
    // console.log(user)
    return (
       <></>
    );
  };