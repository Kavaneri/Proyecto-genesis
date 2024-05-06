import React from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaSalud() {
  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Salud"}/>
    </div>
  )
}
