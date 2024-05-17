import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import logo from './Logo la merced.png'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginContext } from './context-login/context-login';

//
const schema = z.object({
    email: z.string().email({ message: "Correo invalido" }),
    password: z.string().min(1, { message: "Contraseña invalida" })
})


export default function Login() {

    const [correo, setcorreo] = useState(null)
    const [clave, setclave] = useState(null)


    const onSubmit = async (data) => {
        try {
            console.log("email: ", correo);
            console.log("clave: ", clave);
            
            const body = { correo, clave };

            const url = `http://localhost:5000/autenticar`;
            const response = await fetch(url, {
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const data = await response.json();
            console.log("Usuario autenticado:", data);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        document.title = "Ingresar"
    })

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });


    const { authorize, setAuthorize, setAuthorizeAdmin, authorizeAdmin, setUser, user, handleAuth } = useContext(LoginContext)
    const users = [{ name: "Roger Andrey", surname: "Vaca Arboleda", Nuip: "1006309353", phone: "3185747693", correo: "example@hotmail.com", clave: "qQ1!qwer" }, { correo: "chocoroger2011@hotmail.com", clave: "qQ1!qwer", admin: true }]

    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                {/* incluir logo veterinaria */}
                                <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                <h4>Somos clinica veterinaria La Merced </h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control {...register("email")} required type="email" placeholder="Example@hotmail.com" value={correo} onChange={(e) => setcorreo(e.target.value)} />
                                        {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                    </FormGroup>


                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl {...register("password")} required type='password' value={clave} onChange={(e) => setclave(e.target.value)} />
                                        {errors.password && (<div style={{ color: "red" }}>{errors.password.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' id='formGridCheckox'>
                                        <FormCheck type='checkbox' label='Recuerdame' />
                                    </FormGroup>

                                    <div className='text-center pt-1 mb-5 pb-1 '>
                                        <Button
                                            className='mb-4 w-100 gradient-custom-2'
                                            variant='secondary'
                                            type='submit'
                                            disabled={isSubmitting}>
                                            {isSubmitting ? "Espere..." : "Iniciar Sesión"}
                                        </Button>
                                        {errors.root && (<div>{errors.root.message}</div>)}

                                        <Link className='text-muted text-center forgotten-password' to='/correoContraseña'>¿Olvidaste tu contraseña?</Link>
                                    </div>
                                    
                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className='mb-0'>¿No tienes una cuenta?</p>
                                        <Link to='/Register'><Button className='mx-2' variant='outline-primary' >Registrate</Button></Link>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4'>
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'> mision y vision</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
