import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Card, CardGroup, Button } from 'react-bootstrap';
import Cabecera from './header';
import { ShopContext } from './context-shop/context-shop';
import './categoriaComida.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Footer from './footer';

// Componente principal
export default function CategoriaComida({ baseInfo, type = "Comida" }) {
    //console.log("cagaste")
    const { productos, detalleCompra, agregarProducto, filtrarProductos, handleCategory, preFiltrar } = useContext(ShopContext);

    // Console.log para imprimir el estado detalleCompra
    //console.log(JSON.stringify(detalleCompra, null, 2));

    // Hook useEffect para ejecutar código cuando el componente se monta
    useEffect(() => {
        document.title = "Comida"; // Actualiza el título del documento
    }, []);

    // Filtra los productos por tipo utilizando las funciones del contexto
    const primerfiltro = preFiltrar(productos, type);
    const filtrados = filtrarProductos(primerfiltro);

    // Renderizado del componente
    return (
        <>
            <Cabecera />
            <Container fluid onLoad={() => window.scrollTo({ top: -1000, behavior: "smooth" })}>
                <Row className="justify-content-center">
                    <Col className='col-filtros' xs='3'>
                        <div className='sidebar'>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Comida'>Comida</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Hogar'>Hogar</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Juguetes'>Juguetes</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Salud'>Salud</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Viaje'>Viaje</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Paseo'>Paseo</Link>
                            </div>
                        </div>
                    </Col>
                    <Col className='col-main productos'>
                        <Form.Group className="cmb-filtro" id="formGridCheckbox">
                            <Form.Label htmlFor='category' className='cmb-filtro-label'>Especie Mascota</Form.Label>
                            <Form.Select defaultValue="Escoge..." style={{ width: '200px' }} onChange={handleCategory}>
                                <option value='all'>Todos</option>
                                <option value='Perro'>Perros</option>
                                <option value='Gato'>Gatos</option>
                            </Form.Select>
                        </Form.Group>
                        lo mejor para los peluditos
                        <Container>
                            <div className='row justify-content-center align-items-start'>
                                <CardGroup>
                                    {filtrados.map((producto) => (
                                        <div key={producto.id} className='col col-sm-3'>
                                            <Card>
                                                <Card.Img variant="top" src={producto.productImage} />
                                                <Card.Body className='card-body'>
                                                    <Card.Title className='card-title text-center'>
                                                        <small>{producto.productName}</small>
                                                    </Card.Title>
                                                    <Card.Text className='card-text text-center'>
                                                        <small className='text-muted'>{producto.precio}</small>
                                                    </Card.Text>
                                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                                        <Toaster richColors expand={false} closeButton />
                                        {/* aquí es donde se llama la función para agregar un producto */}
                                                        <Button className='mx-2' variant='outline-success' onClick={() => { agregarProducto(producto.id); toast.info('Producto agregado al carrito') }}>
                                                            Agregar al Carrito
                                                        </Button>
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
            <Footer />
        </>
    );
}
