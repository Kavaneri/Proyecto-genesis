
import React from 'react'
import Cabecera from './header'
import Carrusel from './corrusel'
import Cards from './cards'
import Footer from './footer'
import Categorias from './categorias'
export default function Inicio() {
  return (
    <div>
        <Cabecera />
        <Carrusel />
        <Categorias/>
        {/* <Cards /> */}
        <Footer />
    </div>
  )
}
