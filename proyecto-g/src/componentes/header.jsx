import { React, useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas'
import UserModal from './modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import login from './iconos/login.svg'
import carrito from './iconos/carrito2.svg';
import inicio from './iconos/inicio.svg'
import calendario from './iconos/calendario.svg'
import facebook from './iconos/facebook.svg'
import instagram from './iconos/instagram.svg'
import whatsapp from './iconos/whatsapp.svg'
import logo from './Logo la merced.png'
import pqrs from './iconos/pqrs2.svg'
import './header.css'
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { ShopContext } from './context-shop/context-shop';

export default function Cabecera() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getCantidadProductos } = useContext(ShopContext)
    const cantidadProductos = getCantidadProductos()

    return (
        <>
            {['false'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary header-bg" sticky='true'>
                    <Container >
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            scroll='true'
                            className='offcanvas'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <Navbar.Brand className='header-brand txtwhite' href="#" >
                                        <img
                                            alt=""
                                            src={logo}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top" />{' '}
                                        Menú
                                    </Navbar.Brand>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav >
                                <Nav.Item>
                                            <Nav.Link href="/" className='txtwhite'><img src={inicio} alt='inicio' /> Inicio</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/Agendarcita" className='txtwhite'><img src={calendario} alt='agendar cita' /> Agenda tu cita</Nav.Link>
                                        </Nav.Item>
                                        {/*<Nav.Item>
                                            <Nav.Link href='/pqrs' className='txtwhite'><img src={pqrs} alt='pqrs' /> PQRS</Nav.Link>
                                        </Nav.Item>*/}
                                        
 
                                </Nav>
                                <Container>
                                    <Row>
                                        {/* <Col><img src={instagram} alt="instagram" /></Col>
                                            <Col><img src={facebook} alt="facebook" /></Col>
                                            <Col><img src={whatsapp} alt="whatsapp" /></Col>
                                            <Col><img src={instagram} alt="instagram" /></Col> */}
                                    </Row>

                                </Container>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Navbar.Brand className='header-brand'>
                            <Link to='/'>
                            <img
                                alt=""
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top" />{' '}
                                </Link>
                        </Navbar.Brand>
                        <Row className='justifu-content-center'>
                            {/* <Col>
                                <Form className="d-flex navbar-form ">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant='primary'>
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
                            </Col> */}
                            <Col>
                                <UserModal />
                            </Col>
                            <Col className='column-cart'>
                                <Link to='/Carrito' >
                                    <div className='div-img position-relative'>
                                        <img src={carrito} alt="carro de compras" /><Badge className='badge' bg="danger">{cantidadProductos}</Badge>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            ))}

        </>

    )
}