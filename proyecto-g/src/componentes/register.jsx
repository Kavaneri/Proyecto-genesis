import React from 'react'
import './login.css'
import Carousel from 'react-bootstrap/Carousel';
import img1 from './imagenes/promo-la-merced.jpg'
import img2 from './imagenes/dia-del-gato-la-merced.jpg'
import img3 from './imagenes/servicios-la-merced.jpg'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'


let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const schema = z.object({
    nombre: z.string().min(1),
    apellidos: z.string().min(1),
    email: z.string().email({message: "Correo invalido"}),
    password: z.string().min(8,{message: "Contraseña invalida"}).regex(regex, {message: "La contraseña debe contener al menos una letra en mayuscula, una en minuscula y un caracter especial"}),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no conciden",
    path:["confirmPassword"],
});

export default function Register() {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({resolver: zodResolver(schema)});

    const onSubmit = async (data) => {
        try{
            await new Promise((resolve) => setTimeout(resolve, 1000))
            throw new Error()
            console.log(data);
        }catch (error){
            setError("root",{
                message: "Correo o contraseña incorrectos"
            })
        }
       
    }

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
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <FormGroup as={Col} controlId='formGridName'>
                                        <FormLabel>Nombre</FormLabel>
                                        <Form.Control {...register("nombre")} required />
                                        {errors.nombre && (<div style={{color:"red"}}>{errors.nombre.message}</div>)}
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridSurname'>
                                        <FormLabel>Apellidos</FormLabel>
                                        <Form.Control {...register("apellidos")} required />
                                        {errors.apellidos && (<div style={{color:"red"}}>{errors.apellidos.message}</div>)}
                                    </FormGroup>
                                </Row>

                                <Row>

                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control {...register("email")} type="email" placeholder="Example@hotmail.com" required />
                                        {errors.email && (<div style={{color:"red"}}>{errors.email.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl {...register("password")} type='password' required />
                                        {errors.password && (<p role='alert' style={{color:"red"}}>{errors.password.message}</p >)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridConfirmPassword'>
                                        <FormLabel>Confirma tu contraseña</FormLabel>
                                        <FormControl {...register("confirmPassword")} type='password' required />
                                        {errors.confirmPassword && (<p role='alert' style={{color:"red"}}>{errors.confirmPassword.message}</p>)}
                                    </FormGroup>

                                    <div className='text-center pt-1 mb-5 pb-1 '>
                                        <Button 
                                        className='mb-4 w-100 gradient-custom-2' v
                                        ariant='secondary' 
                                        type='submit'
                                        disabled={isSubmitting}
                                         >{isSubmitting ? "Espere..." : "Crear Cuenta"}</Button>
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
