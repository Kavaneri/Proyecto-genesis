import React, { useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import fotoUsario from "./imagenes/fotoPerfil.jpg"
import fotoPerro from "./imagenes/perroPerfil.jpg"
import Stack from 'react-bootstrap/Stack';
import UserModal from './modal';
import { Link } from 'react-router-dom';
import inicio from "./iconos/inicio.svg"
import calendario from './iconos/calendario.svg'
import facebook from './iconos/facebook.svg'
import instagram from './iconos/instagram.svg'
import whatsapp from './iconos/whatsapp.svg'
import pqrs from './iconos/pqrs2.svg'
import logo from './Logo la merced.png'
import success from './iconos/success.svg'
import carrito from './iconos/carrito2.svg';
import './EditarPerfil.css'

import { LoginContext } from './context-login/context-login';
import { Navigate } from "react-router-dom";




export default function EditarPerfil() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const expand = "False"

    const { authorize, handleAuth } = useContext(LoginContext)

    const authState = JSON.parse(localStorage.getItem('authorization'))

    const [authenticated, setAuthenticated] = useState(authState)

    useEffect(() => {

        document.title="Mi Perfil"

        const logged = authorize
        if (logged) {
            setAuthenticated(true)
        }
    }, [])

    if (!authenticated) {
        return <Navigate to="/Login" />
    } else {
        return (

            <>

                {/* <headerP margenIzq="00px" /> */}
                {/* <Cabecera /> */}
                {['false'].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body-tertiary header-bg" sticky='true'>
                        <Container fluid>
                            <Stack direction='horizontal' gap={3}>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                                <Navbar.Offcanvas
                                    id={`offcanvasNavbar-expand-${expand}`}
                                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                    placement="start"
                                    scroll='true'
                                    show={true}
                                    backdrop=""
                                >
                                    <Offcanvas.Header >
                                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                            <Navbar.Brand className='header-brand' href="/">
                                                <img
                                                    alt=""
                                                    src={logo}
                                                    width="30"
                                                    height="30"
                                                    className="d-inline-block align-top" />{' '}
                                                Navbar Offcanvas</Navbar.Brand>
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <Nav>
                                            <Nav.Item>
                                                <Nav.Link href="/"><img src={inicio} alt='inicio' /> Inicio</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/Agendarcita"><img src={calendario} alt='agendar cita' /> Agenda tu cita</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href='/pqrs'><img src={pqrs} alt='pqrs' /> PQRS</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Container>
                                            <Row>
                                                <Col><img src={instagram} alt="instagram" /></Col>
                                                <Col><img src={facebook} alt="facebook" /></Col>
                                                <Col><img src={whatsapp} alt="whatsapp" /></Col>
                                                <Col><img src={instagram} alt="instagram" /></Col>
                                            </Row>

                                        </Container>
                                    </Offcanvas.Body>
                                </Navbar.Offcanvas>
                                <Navbar.Brand className='header-brand' to="/">
                                    <img
                                        alt=""
                                        src={logo}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top" />{' '}
                                    Navbar Offcanvas</Navbar.Brand>
                            </Stack>
                            <Row>
                                <Col lg={9}>
                                    <Form className="d-flex navbar-form ">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />
                                        <Button >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </Button>
                                    </Form>
                                </Col>
                                <Col lg={2}>
                                    <UserModal />
                                </Col>
                                <Col lg={1} className='col-cart'>
                                    <Link to='/Carrito'>
                                        <div className='div-img'>
                                            <img src={carrito} alt="carro de compras" />
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Navbar>
                ))}
                <div>



                    {/* <Button variant="primary" onClick={handleShow}>
                        Launch
                    </Button> */}
                    {/*
                    <Offcanvas show={true} expand="false" onHide={handleClose} backdrop="" scroll="true" animation="">
                        <Offcanvas.Header >
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                 <Nav.Item>
                                    <Nav.Link to="/"><img src={inicio} alt='inicio' /> Inicio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#action2"><img src={calendario} alt='agendar cita' /> Agenda tu cita</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href='/pqrs'><img src={pqrs} alt='pqrs' /> PQRS</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Container>
                                <Row>
                                    <Col><img src={instagram} alt="instagram" /></Col>
                                    <Col><img src={facebook} alt="facebook" /></Col>
                                    <Col><img src={whatsapp} alt="whatsapp" /></Col>
                                    <Col><img src={instagram} alt="instagram" /></Col>
                                </Row>
    
                            </Container>
                        </Offcanvas.Body>
                    </Offcanvas> */}

                    <div className="div-accesos ">
                        <Tabs
                            defaultActiveKey="profile"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >

                            <Tab eventKey="home" title="Perfil">
                                <div className="div-usuario">
                                    <div className="div-imagenUsuario">

                                        <Image src={fotoUsario} roundedCircle width={300} />


                                    </div>
                                    <h3 style={{ textAlign: "center" }}>Joaquin Hernan Carvajal Martinez</h3>

                                    <div className="div-editarUsuario ">
                                        <Form>
                                            <Row className="mb-5">
                                                <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Datos Personales</h3>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Control placeholder="Nombre" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Control placeholder="Apellido" />
                                                </Form.Group>

                                            </Row>
                                            <Row className="mb-5">
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Control placeholder="Teléfono" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Control placeholder="Cédula" />
                                                </Form.Group>

                                            </Row>

                                            <div className="div-correo">

                                                <Form.Group className="correoUsuario" controlId="formGridAddress1">
                                                    <Form.Control type="email" placeholder="Correo" />
                                                </Form.Group>
                                            </div>

                                            <Row className="div-ubicacion">

                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Select defaultValue="Barrio">
                                                        <option>Barrio</option>
                                                        <option>Prado</option>
                                                        <option>Emilia</option>
                                                        <option>Las Mercedes</option>
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridAddress2">
                                                    <Form.Control placeholder="Direccion" />
                                                </Form.Group>
                                            </Row>

                                            <Alert show={show} variant="success">

                                                <h3 style={{ textAlign: "center" }} >
                                                    Se guardaron los cambios correctamente

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
                                                    Guardar Cambios
                                                </Button>

                                                <Button className="mx-2 boton" variant="outline-danger" >
                                                    Cancelar
                                                </Button>

                                            </div>}

                                            {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                                                <Button className="mx-2 boton" variant="outline-danger" >
                                                    Cancelar
                                                </Button>
                                            </div> */}


                                        </Form>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="profile" title="Profile">
                                <div className="div-imagenMascota">

                                    <Image src={fotoPerro} roundedCircle width={300} />


                                </div>
                                <h3 style={{ textAlign: "center" }}>Bengy</h3>

                                <div className="div-editarMascota ">
                                    <Form>
                                        <Row className="mb-5">
                                            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Datos de la Mascota</h3>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Control placeholder="Nombre" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Control placeholder="Raza" />
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-5">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Control placeholder="Color" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Control placeholder="id" />
                                            </Form.Group>

                                        </Row>
                                        <Alert show={show} variant="success">

                                            <h3 style={{ textAlign: "center" }} >
                                                Se guardaron los cambios correctamente

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
                                                Guardar Cambios
                                            </Button>

                                            <Button className="mx-2 boton" variant="outline-danger" >
                                                Cancelar
                                            </Button>

                                        </div>}
                                    </Form>

                                </div>
                            </Tab>

                        </Tabs >

                    </div >

                </div >

            </>
        )
    }

}

