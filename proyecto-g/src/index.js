import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Inicio from './componentes/inicio';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './componentes/register';
import Login from './componentes/login';
import Carrito from './componentes/carrito';
import Cabecera from './componentes/header';
import Pqrs from './componentes/pqrs';
import EditarPerfil from './componentes/EditarPerfil';
import Formulario from './componentes/FormularioCitas(1)';
import CategoriaComida from './componentes/categoriaComida';
import { ShopContextProvider } from './componentes/context-shop/context-shop';


const router = createBrowserRouter(

  [
    {
      path: '/',
      element: <Inicio />,
      errorElement: <div>404 Page not found</div> //Crear una pagina que los devuelva al Inicio cuando la caguen
    },
    {
      path: '/Register',
      element: <Register />
    },
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/Carrito',
      element: <Carrito />
    },
    {
      path: '/pqrs',
      element: <Pqrs />
    },
    {
      path: '/Editarperfil',
      element: <EditarPerfil />
    },
    {
      path: '/Agendarcita',
      element: <Formulario />
    }, {
      path: '/Cat',
      element: <CategoriaComida />
    }
  ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ShopContextProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ShopContextProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
