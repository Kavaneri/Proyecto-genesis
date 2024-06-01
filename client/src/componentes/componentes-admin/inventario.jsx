import React, { useEffect, useState } from 'react';
import './prueba.css';

export default function MostrarProductos() {
  // Estado para almacenar los productos obtenidos de la API
  const [products, setProducts] = useState([]);

  // Hook useEffect para obtener los productos cuando el componente se monta
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Realiza una petición a la API para obtener los productos
        const response = await fetch('http://localhost:5000/productos');
        if (!response.ok) {
          // Lanza un error si la respuesta no es exitosa
          throw new Error('Error al obtener los productos');
        }
        // Convierte la respuesta en formato JSON
        const data = await response.json();
        // Actualiza el estado con los productos obtenidos
        setProducts(data);
      } catch (error) {
        // Maneja errores y muestra un mensaje en la consola
        console.error('Error al obtener los productos:', error);
      }
    };

    // Llama a la función fetchProducts
    fetchProducts();
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  return (
    <div className="inventario-container">
      <h1>Lista de Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.idproducto} className="product-card">
            <h2>{product.producto}</h2>
            <p>Descripción: {product.descripccion}</p>
            <p>Precio: ${product.precioventa}</p>
            {product.foto && (
              <div className="preview">
                <img
                  // Convierte los datos de la imagen de bytes a base64 y luego crea una URL de datos
                  src={`data:image/jpeg;base64,${btoa(
                    // Convierte un array de bytes a una cadena base64
                    new Uint8Array(product.foto.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )}`}
                  alt={product.producto} // Establece un texto alternativo para la imagen
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
