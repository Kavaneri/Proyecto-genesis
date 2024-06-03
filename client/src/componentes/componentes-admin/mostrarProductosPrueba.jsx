import React, { useEffect, useState } from 'react';

import './prueba.css';

export default function MostrarProductos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productos');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

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
                  src={`data:image/jpeg;base64,${btoa(
                    new Uint8Array(product.foto.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  )}`}
                  alt={product.producto}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
