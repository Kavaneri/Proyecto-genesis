import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaJuguetes() {

  const productosJuguetes = async (data) => {
    try {
        const url = `http://localhost:5000/productos/juguetes`;
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

  const mostrarProductosjuguetes = async () => {
      const productosMostrar = await productosJuguetes(); // Esperar a que la promesa se resuelva
      console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
  };

  mostrarProductosjuguetes();

  useEffect(() =>{
    document.title = "Jueguetes"
  })

  return (
    <div >
    <CategoriaComida baseInfo={PRODUCTS} type={"Juguetes"}/>
    </div>
  )
}
