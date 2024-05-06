import React from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaPaseo() {
  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Paseo"}/>
    </div>

  )
}
