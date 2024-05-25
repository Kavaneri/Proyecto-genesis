import React, { useContext, useEffect } from 'react'
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
import {Toaster, toast} from 'sonner'
import Footer from './footer'


export default function CategoriaComida({baseInfo, type = "Comida"}) {

    const productosComida = async (data) => {
        try {
            const url = `http://localhost:5000/productos/comida`;
            const response = await fetch(url, {
                method : "GET",
                headers: {"Content-Type": "application/json"}
            });
            const data = await response.json();
            console.log("productos:", response)
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    const mostrarProductosComida = async () => {
        const productosMostrar = await productosComida(); // Esperar a que la promesa se resuelva
        console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
    };
    
    mostrarProductosComida();

    useEffect(()=> {
        document.title = "Comida"
    })

    // type = "Comida"
    const { agregarProducto, filtrarProductos, handleCategory, preFiltrar} = useContext(ShopContext)


    const primerfiltro = preFiltrar(PRODUCTS, type)

    const filtrados = filtrarProductos(primerfiltro)
    return (
        <>
            <Cabecera />
            <Container fluid onLoad={() => window.scrollTo({top: -1000, behavior:"smooth"})}>
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

                    <Col className='col-main productos' >
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

                                            <Card>
                                                <Card.Img variant="top" src={producto.productImage} />
                                                <Card.Body className='card-body'>
                                                    <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                                                    <Card.Text className='card-text text-center'>
                                                        <small className='text-muted'>{producto.precio}</small>
                                                    </Card.Text>
                                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                                        <Toaster richColors expand={false} closeButton/>
                                                        <Button className='mx-2' variant='outline-success' onClick={() => {agregarProducto(producto.id); toast.info('Producto agregado al carrito')}}>Agregar al Carrito</Button>
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
        
    )

}
