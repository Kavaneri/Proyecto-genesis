import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaPaseo() {

  const productosPaseo = async (data) => {
    try {
        const url = `http://localhost:5000/productos/paseo`;
        const response = await fetch(url, {
            method : "GET",
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
  };

  const mostrarProductos = async () => {
      const productosMostrar = await productosPaseo(); // Esperar a que la promesa se resuelva
      console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
  };
  
  useEffect(() =>{
    document.title="Paseo"
  })

  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Paseo"}/>
    </div>

  )
}
