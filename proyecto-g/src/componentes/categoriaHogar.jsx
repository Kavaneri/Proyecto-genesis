import React from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaHogar() {
  return (
    <div onLoad={() => window.scrollTo({ top: -1000, behavior: "smooth" })}>
      <CategoriaComida baseInfo={PRODUCTS} />
    </div>

  )
}
