import logo from './logo.svg';
// import './App.css';
import Carrusel from './componentes/corrusel';
// import Cards from './componentes/cards';
import Footer from './componentes/footer';
import Login from './componentes/login';
import Register from './componentes/register';
// import UserModal from './componentes/modal';
import Inicio from './componentes/inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Categorias from './componentes/categorias';
import CategoriaComida from './componentes/categoriaComida';
import Cabecera from './componentes/header';
import React, { useState } from 'react';
import Carrito from './componentes/carrito';

function App() {

  return (


      <div className="App">

        {/* <Categorias /> */}


        {/* <header className='App-header'>
          <Cabecera />
        </header>
        <body>
          <Carrusel />
          <Routes>
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Cat' element={<CategoriaComida />}></Route>
            <Route path='/Carrito' element={<Carrito />}></Route>
          </Routes>
        </body>
        <footer>
          <Footer />
        </footer> */}

      </div>
  );
}

export default App;
