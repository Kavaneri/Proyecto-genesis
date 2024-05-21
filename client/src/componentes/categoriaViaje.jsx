import React, { useEffect } from 'react'
import CategoriaComida from './categoriaComida'
import { PRODUCTS } from './productos'

export default function CategoriaViaje() {

  const productosViaje = async (data) => {
    try {
        const url = `http://localhost:5000/productos/viaje`;
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

  const mostrarProductosViaje = async () => {
      const productosMostrar = await productosViaje (); // Esperar a que la promesa se resuelva
      console.log("return: ", productosMostrar); // Ahora productosMostrar debería contener los datos
  };
  
  mostrarProductosViaje();

  useEffect(() =>{
    document.title="Viaje"
  })

  return (
    <div>
    <CategoriaComida baseInfo={PRODUCTS} type={"Viaje"}/>
    </div>
  )
}
