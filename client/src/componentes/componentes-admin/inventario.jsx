import React, { useState } from 'react';
import './producto.css';

export default function Inventario() {
  const [producto, setProducto] = useState('');
  const [descripccion, setDescripccion] = useState('');
  const [precioventa, setPrecioventa] = useState(0);
  const [idespecie, setIdespecie] = useState(0);
  const [idcategoria, setIdcategoria] = useState(0);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('producto', producto);
    formData.append('descripccion', descripccion);
    formData.append('precioventa', precioventa);
    formData.append('idespecie', idespecie);
    formData.append('idcategoria', idcategoria);
    formData.append('foto', foto);
  
    fetch('http://localhost:5000/productos', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Producto agregado con éxito!');
      })
      .catch((error) => {
        console.error('Error al insertar el producto:', error);
        alert('Error al insertar el producto.');
      });
  };
  

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  return (
    <div className="inventario-container">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="inventario-form">
        <label>
          Nombre del Producto:
          <input
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            value={descripccion}
            onChange={(e) => setDescripccion(e.target.value)}
            required
          />
        </label>
        <label>
          Precio de Venta:
          <input
            type="number"
            value={precioventa}
            onChange={(e) => setPrecioventa(parseFloat(e.target.value))}
            required
          />
        </label>
        <label>
          Especie:
          <select
            value={idespecie}
            onChange={(e) => setIdespecie(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Seleccionar</option>
            <option value="2">Perro</option>
            <option value="1">Gato</option>
          </select>
        </label>
        <label>
          Categoría:
          <select
            value={idcategoria}
            onChange={(e) => setIdcategoria(parseInt(e.target.value, 10))}
            required
          >
            <option value="">Seleccionar</option>
            <option value="1">Comida</option>
            <option value="2">Hogar</option>
            <option value="3">Juguetes</option>
            <option value="4">Salud</option>
            <option value="5">Viaje</option>
            <option value="6">Paseo</option>
          </select>
        </label>
        <label>
          Foto:
          <input type="file" onChange={handleFotoChange} required />
        </label>
        {preview && (
          <div className="preview">
            <p>Previsualización de la imagen:</p>
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}
