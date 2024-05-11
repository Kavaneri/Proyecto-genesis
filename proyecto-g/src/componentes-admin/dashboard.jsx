import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './dashboard.css'
import logo from './Logo la merced.png'
import usuarioLogo from './login.svg'
import { Route, Routes } from 'react-router'
import Citas from './citas'
import { BrowserRouter, Link, Outlet } from 'react-router-dom'

export default function Dashboard() {

    const [estiloLogo, setEstiloLogo] = useState("logo-contenido")

    const handleEstiloLogo = () => setEstiloLogo("logo-contenido-escondido")

    const cambioEstilo = estiloLogo

    useEffect(() => {
        document.title = "Admin"
    })
    return (
        <>
            <Container fluid>
                {/* <BrowserRouter> */}
                    <Row>
                        <Col className='columna-navegacion col-2 d-flex flex-column justify-content-center align-items-center'>
                            <div className='mb-5 '> <img src={usuarioLogo} alt='imagen usuario' /> Nombre admin/recep</div>
                            <Link className='my-4' to='/Admin/Citas' onClick={handleEstiloLogo}>< Button variant='success'>Citas</Button></Link>
                            <Link className='my-4' to='/Admin/Ventas' onClick={handleEstiloLogo}>< Button variant='success'>Ventas</Button></Link>
                            <Link className='my-4' to='/Admin/Inventario' onClick={handleEstiloLogo}>< Button variant='success'>Inventario</Button></Link>
                            <Link className='my-4' to='/Admin/Servicios' onClick={handleEstiloLogo}>< Button variant='success'>Servicios</Button></Link>
                            <Link className='my-4' to='/Admin/Proveedores' onClick={handleEstiloLogo}>< Button variant='success'>Proveedores</Button></Link>
                          
                        </Col>
                        <Col className='columna-contenido col-10 d-flex justify-content-center align-items-center'>
                            <img className={cambioEstilo} src={logo} alt='logo veterinaria la merced' />
                            <Outlet/>
                            {/* <Routes>
                                <Route path='/Citas' element={<Citas />}></Route>
                            </Routes> */}
                        </Col>
                    </Row>
                {/* </BrowserRouter> */}
            </Container>
        </>
    )
}
