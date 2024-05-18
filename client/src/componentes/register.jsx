import React, { useEffect, useState } from 'react'
import './login.css'
import logo from './Logo la merced.png'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const Formulario = () => {

    const [nuipusuario, setnuipusuario] = useState('');
    const [clave_hash, setclave_hash] = useState('');
    const [correo, setcorreo] = useState('');
    const [telefono, settelefono] = useState('');
    const [nombre, setnombres] = useState('');

    const onSubmit = async (data) => {
        try {
            const body = {nuipusuario,clave_hash,correo,telefono,nombre};
            console.log(body);
            const url = `http://localhost:5000/usuarios/cliente`;
            const response = await fetch(url, {
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log("Usuario autenticado:", data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();
    
    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                {/* incluir logo veterinaria */}
                                <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                <h4>Somos clínica veterinaria La Merced</h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <FormGroup as={Col} controlId='formGridName'>
                                        <FormLabel>nombre</FormLabel>
                                        <Form.Control {...register("nombre", { required: "El nombre es obligatorio" })} value={nombre} onChange={(e) => setnombres(e.target.value)} />
                                        {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                    </FormGroup>

                                </Row>

                                <Row>
                                    <FormGroup as={Col} controlId='formGridId'>
                                        <FormLabel>Número de identificación</FormLabel>
                                        <Form.Control 
                                            {...register("nuip", { 
                                                required: "El número de identificación es obligatorio", 
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={nuipusuario} 
                                            onChange={(e) => setnuipusuario(parseInt(e.target.value, 10))} 
                                        />
                                        {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridPhoneNumber'>
                                        <FormLabel>Teléfono</FormLabel>
                                        <Form.Control 
                                            {...register("telefono", { 
                                                required: "El teléfono es obligatorio",
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={telefono} 
                                            onChange={(e) => settelefono(parseInt(e.target.value,10))} />
                                        {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                    </FormGroup>
                                    
                                </Row>

                                <FormGroup className='mb-4' controlId='formGridEmail'>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <Form.Control {...register("email", { required: "El correo electrónico es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "El correo electrónico no es válido" } })} type="email" placeholder="Example@hotmail.com" value={correo} onChange={(e) => setcorreo(e.target.value)} />
                                    {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                </FormGroup>

                                <FormGroup className='mb-4' controlId='formGridPassword'>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl {...register("password", { required: "La contraseña es obligatoria" })} type='password' value={clave_hash} onChange={(e) => setclave_hash(e.target.value)} />
                                    {errors.password && (<p role='alert' style={{ color: "red" }}>{errors.password.message}</p>)}
                                </FormGroup>

                                <FormGroup className='mb-4' controlId='formGridConfirmPassword'>
                                    <FormLabel>Confirma tu contraseña</FormLabel>
                                    <FormControl {...register("confirmPassword", { required: "La confirmación de contraseña es obligatoria", validate: value => value === clave_hash || "Las contraseñas no coinciden" })} type='password' />
                                    {errors.confirmPassword && (<p role='alert' style={{ color: "red" }}>{errors.confirmPassword.message}</p>)}
                                </FormGroup>

                                <div className='text-center pt-1 mb-5 pb-1'>
                                    <Button className='mb-4 w-100 gradient-custom-2' 
                                        variant='secondary' 
                                        type='submit' 
                                        disabled={isSubmitting}>
                                        {isSubmitting ? "Espere..." : "Crear Cuenta"}
                                    </Button>
                                </div>

                                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                    <p className='mb-0'>¿Ya tienes una cuenta?</p>
                                    <Link to='/Login'>
                                        <Button className='mx-2' variant='outline-primary'>Iniciar sesión</Button>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4'>
                            {/* 
                            <Carousel className='carrusel' slide={false}>
                                <Carousel.Item>
                                    <img width={300} height={500} className='d-block w-100' src={img1} alt='primer imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={900} height={500} className='d-block w-100' src={img2} alt='segunda imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={900} height={500} className='d-block w-100' src={img3} alt='tercer imagen' />
                                </Carousel.Item>
                            </Carousel>
                            */}
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'>
                                    I journeyed long in walkin beyond the place of stopping
                                    where there was no more returning to the people I had known I saw the world forgotten
                                    where the grass gives up on growing and I knew that I would never make another journey home
                                    upon that fleshy plain below the final rock outcropping stretch the vast and empty desert
                                    of the hungry, bleeding thing encompassing the earth to the horizon, all-consuming, crying in
                                    a thousand voices to its desolate god-king. And the music of its crying, never dead, ever dying,
                                    sent me running in a madness I can scarce compare to fear.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Formulario;
