import React from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaHogar() {
  return (
    <div>
      <CategoriaComida baseInfo={PRODUCTS} type={"Hogar"}/>
    </div>

  )
}
