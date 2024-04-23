import React from 'react'
import './categorias.css'
import { Link } from 'react-router-dom'

export default function Categorias() {
    return (
        <div className=' container text-center categorias-div'>
            <div className='row align-items-start'>
                <div className='col items item-1'>

                    {/* Todas la etiquetas "a" serán reemplazadas por etiquetas "Link" */}

                    {/* <Link to='/Register'>
                        <p>Comida</p>
                    </Link> */}
                    <a href='/Cat'>
                        <p>Comida</p>
                    </a>
                </div>
                <div className='col items item-2'>
                    <a href='#'>
                        <p>Hogar</p>
                    </a>
                </div>
                <div className='col items item-3'>
                    <a href='#'>
                        <p>Juguetes</p>
                    </a>
                </div>

            </div>

            <div className='row align-items-start'>
                <div className='col items item-4'>
                    <a href='#'>
                        <p>Salud</p>
                    </a>
                </div>
                <div className='col items item-5'>
                    <a href='#'>
                        <p>Viajes</p>
                    </a>
                </div>
            </div>

            <div className='row align-items-start'>
                <div className='col items item-6'>
                    <a href='#'>
                        <p>Paseo</p>
                    </a>
                </div>
                <div className='col items item-7'>
                    <a href='#'>
                        <p>Arenas</p>
                    </a>
                </div>

            </div>


        </div>
    )
}
