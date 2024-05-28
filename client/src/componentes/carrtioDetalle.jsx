import React, { useContext } from 'react'
import './carritoDetalle.css'
import { ShopContext } from './context-shop/context-shop';
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form';


export default function CarritoDetalle(props) {

    //detalle compra: id y cantidad nota" agregar valor total"
    //

    const { id, productName, precio, productImage } = props.data
    const { detalleCompra, agregarProducto, removerProducto } = useContext(ShopContext)

    console.log(JSON.stringify(detalleCompra));

    return (
        <div className='div-detalles'>
            <div className='div-card'>
                <div className="card mb-3 detalle" >
                    <div className="row g-0 align-items-center">

                        <div class="col">
                            <img src={productImage} class="img-fluid rounded-start productoDetalleVenta" alt="imagen producto" />
                        </div>

                        <div className="col d-flex">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-break">{productName}</h5>
                                <p className="card-text text-break">{precio}</p>
                            </div>
                        </div>

                        <div className='col-md my-4 px-5 d-flex justify-content-center align-items-center '>
                            <Button className='agregarQuitar' onClick={() => removerProducto(id)} variant='danger'>-</Button>
                            <Form.Control type='text' value={detalleCompra[id]} className='text-center'/>
                            <Button className='agregarQuitar' onClick={() => agregarProducto(id)} variant='success'>+</Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
