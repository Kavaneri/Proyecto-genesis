import React from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaJuguetes() {
  return (
    <div >
    <CategoriaComida baseInfo={PRODUCTS} type={"Juguete"}/>
    </div>
  )
}
