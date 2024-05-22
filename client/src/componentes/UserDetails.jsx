import React from 'react';
import './UserDetails.css'; 
import Footer from './footer'
import Cabecera from './header';
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.string().email({ message: "Correo invalido" }),
    password: z.string().min(1, { message: "Contraseña invalida" })
});

function UserDetails({ user }) {
    const { correo, nombre, nuipusuario, telefono } = user;
    const onSubmit = async (data) => {
        try {
            console.log("aqui");
        } catch (err) {
            console.log(err.message);
        }
    };

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });


    return (
        <div className='todo'>
        <Cabecera />
        <div className="user-details-container">
            <h2 className="user-details-title">Detalles del Usuario</h2>
            <div className='separador'></div>
            <div className="user-details-item">
                <span className="user-details-label">Correo:</span>
                <span className="user-details-value">{correo}</span>
            </div>
            <div className="user-details-item">
                <span className="user-details-label">Nombre:</span>
                <span className="user-details-value">{nombre}</span>
            </div>
            <div className="user-details-item">
                <span className="user-details-label">NUIP Usuario:</span>
                <span className="user-details-value">{nuipusuario}</span>
            </div>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="user-details-item">
                    <span className="user-details-label">Teléfono:</span>
                    <input
                    type="text"
                    name="telefono"
                    value={user.telefono}
                  />
                </div>
                <Button variant="success" type="submit" className="update-button">
                    Actualizar
                </Button>
            </Form>
        </div>
      <Footer />

        </div>
    );
}

export default UserDetails;