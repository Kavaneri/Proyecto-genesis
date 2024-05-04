import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { PRODUCTS } from './productos';
import Cabecera from './header';
import { ShopContext } from './context-shop/context-shop';
import './categoriaComida.css'
import { Link } from 'react-router-dom';


export default function CategoriaComida() {



    const { agregarProducto, filtrarProductos, handleCategory } = useContext(ShopContext)
    const filtrados = filtrarProductos(PRODUCTS)
    return (
        <>
            <Cabecera />
            <Container fluid>
                <Row className="justify-content-center">
                    <Col className='col-filtros' xs='3'>

                        <div className='div-filtro'>
                            <Link className='' to='/Comida'>Comida</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Hogar'>Hogar</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Juguetes'>juguetes</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Salud'>Salud</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Viaje'>Viaje</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Paseo'>Paseo</Link>
                        </div>

                        <div className='div-filtro'>
                            <Link className='' to='/Arenas'>Arenas</Link>
                        </div>

                    </Col>

                    <Col className='col-main' >
                        <Form.Group className="cmb-filtro" id="formGridCheckbox">
                            <Form.Label htmlFor='category' className='cmb-filtro-label'>Categoria</Form.Label>
                            <Form.Select defaultValue="Escoge..." style={{ width: '200px' }} onChange={handleCategory}>
                                <option value='all'>Todos</option>
                                <option value='Perro'>Perros</option>
                                <option value='Gato'>Gatos</option>
                            </Form.Select>
                        </Form.Group>
                        columna productos - tipo animal

                        <Container>
                            <div className='row justify-content-center align-items-start'>
                                <CardGroup>
                                    {filtrados.map((producto) => (
                                        <div key={producto.id} className='col col-sm-3'>

                                            {/* <Cards {...producto}/> */}

                                            <Card>
                                                <Card.Img variant="top" src={producto.productImage} />
                                                <Card.Body className='card-body'>
                                                    <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                                                    <Card.Text className='card-text text-center'>
                                                        <small className='text-muted'>{producto.precio}</small>
                                                    </Card.Text>
                                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                                        <Button className='mx-2' variant='outline-success' onClick={() => agregarProducto(producto.id)}>Agregar Al Carrito</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </CardGroup>
                            </div>
                        </Container>
                    </Col>


                </Row>
            </Container>
        </>
    )

}
