import React, { useContext } from 'react';
import { ShopContext } from './context-shop/context-shop';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './carritoDetalle.css'; // Asegúrate de crear y enlazar este archivo CSS

const CarritoDetalle = ({ data }) => {
    const { agregarProducto, removerProducto, detalleCompra } = useContext(ShopContext);
    const { id, productName, precio, productImage } = data;
    const cantidad = detalleCompra[id]?.cantidad || 0;

    return (
        <Card className="my-2">
            <Card.Body>
                <div className="d-flex align-items-center detalle">
                    <img src={productImage} alt={productName} width="50" height="50"  className='fotoProducto'/>
                    <div className="ms-3">
                        <Card.Title>{productName}</Card.Title>
                        <Card.Text>${precio}</Card.Text>
                        <Card.Text>Total: ${cantidad * precio}</Card.Text>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                        <Button variant="danger" onClick={() => removerProducto(id)}>-</Button>
                        <span className="cantidad mx-2">{cantidad}</span>
                        <Button variant="success" onClick={() => agregarProducto(id)}>+</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CarritoDetalle;
