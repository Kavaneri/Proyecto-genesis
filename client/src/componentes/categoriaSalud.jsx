import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaSalud() {

  const productos = async (data) => {
    try {
        const url = `http://localhost:5000/productos/salud`;
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
      const productosMostrar = await productos(); // Esperar a que la promesa se resuelva
      console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
  };
  useEffect(()=>{
    document.title="Salud"
  })

  return (
    <div >
      <CategoriaComida baseInfo={PRODUCTS} type={"Salud"}/>
    </div>
  )
}
