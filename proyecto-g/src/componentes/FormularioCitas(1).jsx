import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./FormularioCitas(1).css"
import UserModal from "./modal";
import success from './iconos/success.svg'
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import Cabecera from "./header";

export default function Formulario() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (

        <>

            <Cabecera />
            <div className="div-Formulario d-flex flex-column md-5">

                <h2 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h2>
                <Form>

                    <Row className="mb-5">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control placeholder="Nombre" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Apellido" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control placeholder="Nombre de la mascota" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control placeholder="Raza" />
                        </Form.Group>


                    </Row>

                    <Row className="mb-5">
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Control type="email" placeholder="Correo" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Control placeholder="Telefono" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAddress2">
                            <Form.Control placeholder="Direccion" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="Choose...">
                                <option>Seleccione el tipo de domicilo</option>
                                <option>Visita domiciliaria</option>
                                <option>Recoger la mascota en el domicilio</option>
                                <option>Presencial</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-5">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Control placeholder="Calendario" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="Choose...">
                                <option>Tipo de cita</option>
                                <option>Estetica</option>
                                <option>Control</option>
                                <option>Ortopedia</option>
                                <option>Profilaxis</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control as="textarea" rows={1} placeholder="Direccion" />
                        </Form.Group>
                    </Row>
                    <Alert show={show} variant="success">

                        <h3 style={{ textAlign: "center" }} >
                            Se agendo la cita correctamente

                            <div className="div-imagenUsuario">

                                <Image src={success} alt="imagen chulo" />


                            </div>
                        </h3>
                        <hr />
                        <div style={{ textAlign: "center", marginBottom: "30" }} >
                            <Button className="mx-2 boton" variant="outline-danger " onClick={() => setShow(false)} >
                                Cerrar
                            </Button>
                        </div>
                    </Alert>

                    {!show && <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                        <Button className="mx-2 boton" variant="outline-primary" onClick={() => setShow(true)} >
                            Agendar Cita
                        </Button>
                    </div>}

                </Form>
            </div>

        </>

    )



}