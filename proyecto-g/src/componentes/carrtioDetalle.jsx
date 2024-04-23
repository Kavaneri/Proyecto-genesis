import React from 'react'
import './carritoDetalle.css'
import Button from 'react-bootstrap/esm/Button'


export default function CarritoDetalle(props) {

    const { id, productName, precio, productImage } = props.data

    return (
        <div className='div-detalles'>
            <div className='div-card'>
                <div className="card mb-3 detalle" >
                    <div className="row g-0 align-items-center">

                        <div class="col">
                            <img src={productImage} class="img-fluid rounded-start" alt="imagen producto" />
                        </div>

                        <div className="col">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{productName}</h5>
                                <p className="card-text">{precio}</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>

                        <div className='col'>
                            <button>-</button>
                            <input />
                            <button>+</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
