import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaHogar() {

  
  const productosHogar = async (data) => {
    try {
        const url = `http://localhost:5000/productos/hogar`;
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

  const mostrarProductosHogar = async () => {
      const productosMostrar = await productosHogar(); // Esperar a que la promesa se resuelva
      console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
  };
  mostrarProductosHogar();

  useEffect(() =>{
    document.title="Hogar"
  })

  return (
    <div>
      <CategoriaComida baseInfo={PRODUCTS} type={"Hogar"}/>
    </div>

  )
}
