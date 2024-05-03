import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { PRODUCTS } from './productos';
import './carruselDescuentos.css'

export default function CarruselDescuentos() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} bsPrefix='' >
            {PRODUCTS.map((producto) => (
                <Carousel.Item className='carrusel-elem'>
                    <Card className='tarjeta-carrusel'>
                        <div className='img-wrapper'>
                            <Card.Img variant="top" src={producto.productImage} />
                        </div>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                            <Card.Text className='card-text text-center'>
                                <small className='text-muted'>{producto.precio}</small>
                            </Card.Text>
                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <Button className='mx-2' variant='outline-success'>Agregar Al Carrito</Button>
                                {/* onClick={() => agregarProducto(producto.id)} */}
                            </div>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
        // <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        //     <div className="carousel-inner carrusel-interno">
        //         {PRODUCTS.map((producto) => (
        //             <div className="carousel-item active carrusel-elem">
        //                 <Card>
        //                     <div className='img-wrapper'>
        //                         <Card.Img variant="top" src={producto.productImage}  />
        //                     </div>
        //                     <Card.Body className='card-body'>
        //                         <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
        //                         <Card.Text className='card-text text-center'>
        //                             <small className='text-muted'>{producto.precio}</small>
        //                         </Card.Text>
        //                         <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        //                             <Button className='mx-2' variant='outline-success'>Agregar Al Carrito</Button>
        //                             {/* onClick={() => agregarProducto(producto.id)} */}
        //                         </div>
        //                     </Card.Body>
        //                 </Card>
        //             </div>
        //         ))}

        //     </div>
        //     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Previous</span>
        //     </button>
        //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Next</span>
        //     </button>
        // </div>

    )
}
