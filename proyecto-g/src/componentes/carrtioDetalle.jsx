import React, { useContext } from 'react'
import './carritoDetalle.css'
import { ShopContext } from './context-shop/context-shop';
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form';


export default function CarritoDetalle(props) {

    const { id, productName, precio, productImage } = props.data
    const { detalleCompra, agregarProducto, removerProducto } = useContext(ShopContext)


    return (
        <div className='div-detalles'>
            <div className='div-card'>
                <div className="card mb-3 detalle" >
                    <div className="row g-0 align-items-center">

                        <div class="col">
                            <img src={productImage} class="img-fluid rounded-start" alt="imagen producto" />
                        </div>

                        <div className="col d-flex">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-break">{productName}</h5>
                                <p className="card-text text-break">{precio}</p>
                                <p className="card-text text-break"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>

                        <div className='col-md my-4 px-5 d-flex justify-content-center align-items-center'>
                            <Button onClick={() => removerProducto(id)} variant='danger'>-</Button>
                            <Form.Control type='text' value={detalleCompra[id]} className='text-center'/>
                            <Button onClick={() => agregarProducto(id)} variant='success'>+</Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
