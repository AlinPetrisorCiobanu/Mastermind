import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Custom_Input } from '../Input/Input';

export const Custom_Modal = ({show , onHide , user }) => {

  const props = { show, onHide };
    console.log(user)
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modificar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>{user._id}</h6>
          <Row className='mt-5'>
            <Col xs={12} md={6}><p>{user.name} : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>{user.last_name} : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>{user.email} : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>{user.nickname} : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>Contraseña : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          {user.role === "user" && (
            <>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>Confirmación ({user.confirmed?("true"):("false")}) : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>Activo ({user.is_active?("true"):("false")}) : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12} md={6}><p>Rol ({user.role}) : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
          <Row className='mt-3 mb-5'>
            <Col xs={12} md={6}><p>Master Puntos ({user.MasterPoints}) : </p></Col>
            <Col xs={12} md={6}><Custom_Input /></Col>
          </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };