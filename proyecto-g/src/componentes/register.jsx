import React from 'react'
import './login.css'
import Carousel from 'react-bootstrap/Carousel';
import img1 from './imagenes/promo-la-merced.jpg'
import img2 from './imagenes/dia-del-gato-la-merced.jpg'
import img3 from './imagenes/servicios-la-merced.jpg'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                {/* incluir logo veterinaria */}
                                <h4>Somos clinica veterinaria La Merced </h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form>
                                <Row className="mb-3">
                                    <FormGroup as={Col} controlId='formGridName'>
                                        <FormLabel>Nombre</FormLabel>
                                        <Form.Control />
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridSurname'>
                                        <FormLabel>Apellidos</FormLabel>
                                        <Form.Control />
                                    </FormGroup>
                                </Row>

                                <Row>

                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control type="email" placeholder="Example@hotmail.com" />
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl type='password' />
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Confirma tu contraseña</FormLabel>
                                        <FormControl type='password' />
                                    </FormGroup>

                                    <div className='text-center pt-1 mb-5 pb-1 '>
                                        <Button className='mb-4 w-100 gradient-custom-2' variant='secondary' type='submit'>Crear cuenta</Button>
                                    </div>

                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className='mb-0'>Ya tienes una cuenta?</p>
                                       <Link to='/Login'> <Button  className='mx-2' variant='outline-primary' >Iniciar sesión</Button></Link>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4'>
                            {/* <Carousel className='carrusel' slide={false}>
                                <Carousel.Item>
                                    <img
                                        width={300}
                                        height={500}
                                        className='d-block w-100'
                                        src={img1}
                                        alt='primer imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        width={900}
                                        height={500}
                                        className='d-block w-100'
                                        src={img2}
                                        alt='segunda imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        width={900}
                                        height={500}
                                        className='d-block w-100'
                                        src={img3}
                                        alt='tercer imagen' />
                                </Carousel.Item>
                            </Carousel> */}
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'> I journeyed long in walkin beyond the place of stopping
                                    where there was no more returning to the people i had known i saw the world forgotten
                                    where the grass gives up on growing and i knew that i would never make another journey home
                                    upon that fleshy plain below the final rock outcropping stretch the vast and empty desert
                                    of the hungry, bleeding thing encompasing the earth to the horizon, all-consuming, crying in
                                    a thousand voices to its desolate god-king. And the music of its crying, never deade, ever dying,
                                    sent me running in a madness i can scarce compare to fear</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
