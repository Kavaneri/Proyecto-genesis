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



const schema = z.object({
    email: z.string().email({ message: "Correo invalido" }),
    password: z.string().min(8, { message: "Contraseña invalida" })
})




export default function Login() {

    useEffect(() => {
        document.title = "Ingresar"
    })

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });


    const { authorize, setAuthorize, setAuthorizeAdmin, authorizeAdmin, setUser, user, handleAuth } = useContext(LoginContext)
    const users = [{ name: "Roger Andrey", surname: "Vaca Arboleda", Nuip: "1006309353", phone: "3185747693", useremail: "example@hotmail.com", userpassword: "qQ1!qwer" }, { useremail: "chocoroger2011@hotmail.com", userpassword: "qQ1!qwer", admin: true }]

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        try {
            const acc = users.find((user) => user.useremail === userEmail)
            if (acc && acc.userpassword === userPassword) {
                setAuthorize(true)
                localStorage.setItem('authorization', JSON.stringify(authorize))
                setUser(acc)
                localStorage.setItem('User', JSON.stringify(acc))

            }

            if (acc && acc.userpassword === userPassword && acc.admin === true) {
                setAuthorizeAdmin(true)
                localStorage.setItem('authorizationAdmin', JSON.stringify(authorizeAdmin))
                setUser(acc)
                localStorage.setItem('User', JSON.stringify(acc))

            }
            if (authorize || authorizeAdmin) {
                navigate("/Editarperfil")
            } 
            


        } catch (err) {
            console.log(err.message)
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
                                <Link to='/'><img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" /></Link>
                                <h4>Somos clinica veterinaria La Merced </h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control {...register("email")} required type="email" placeholder="Example@hotmail.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                        {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                    </FormGroup>


                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl {...register("password")} required type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
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
