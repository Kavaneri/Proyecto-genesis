
import React from 'react'
import Cabecera from './header'
import Carrusel from './corrusel'
import Cards from './cards'
import Footer from './footer'
import Categorias from './categorias'
import CarruselDescuentos from './carruselDescuentos'
export default function Inicio() {
  return (
    <div>
        <Cabecera />
        <Carrusel />
        <Categorias/>
        <CarruselDescuentos/>
        <Footer />
    </div>
  )
}
