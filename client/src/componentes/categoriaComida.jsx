import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, CardGroup, Button } from 'react-bootstrap';
import Cabecera from './header';
import { ShopContext } from './context-shop/context-shop';
import './categoriaComida.css';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Footer from './footer';

// Componente principal
export default function CategoriaComida({ baseInfo, type = "Comida" }) {
    // Estado local para almacenar los productos obtenidos de la API
    const [productos, setProductos] = useState([]);

    // Función para obtener los productos desde la API
    const fetchProductos = async () => {
        try {
            const url = `http://localhost:5000/productos`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            // Mapeo de los datos obtenidos a la estructura esperada por el componente
            const mappedData = data.map(item => ({
                id: item.idproducto,
                productName: item.producto,
                precio: item.precioventa,
                productImage: item.foto || 'default_image_url.jpg', // URL de imagen por defecto si es null
                category: mapSpeciesToCategory(item.idespecie), // Función para mapear idespecie a category
                type: mapCategoryToType(item.idcategoria) // Función para mapear idcategoria a type
            }));

            // Actualiza el estado con los datos mapeados
            setProductos(mappedData);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Hook useEffect para ejecutar código cuando el componente se monta
    useEffect(() => {
        document.title = "Comida"; // Actualiza el título del documento
        fetchProductos(); // Llama a fetchProductos cuando el componente se monta
    }, []);

    // Obtiene funciones y datos del contexto
    const { agregarProducto, filtrarProductos, handleCategory, preFiltrar } = useContext(ShopContext);

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
                                                    <Card.Title className='card-title text-center'>
                                                        <small>{producto.productName}</small>
                                                    </Card.Title>
                                                    <Card.Text className='card-text text-center'>
                                                        <small className='text-muted'>{producto.precio}</small>
                                                    </Card.Text>
                                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                                        <Toaster richColors expand={false} closeButton />
                                        {/* aqui es donde se llama la funcion para agregar un producto */}
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

// Función para mapear idcategoria a type
function mapCategoryToType(idcategoria) {
    switch (idcategoria) {
        case 1:
            return 'Comida';
        case 2:
            return 'Hogar';
        case 3:
            return 'Juguetes';
        case 4:
            return 'Salud';
        case 5:
            return 'Viaje';
        case 6:
            return 'Paseo';
        default:
            return 'Otros'; // Default si idcategoria no coincide
    }
}

// Función para mapear idespecie a category
function mapSpeciesToCategory(idespecie) {
    switch (idespecie) {
        case 1:
            return 'Gato';
        case 2:
            return 'Perro';
        default:
            return 'Otros'; // Default si idespecie no coincide
    }
}
