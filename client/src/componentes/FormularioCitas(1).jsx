import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./FormularioCitas(1).css"
import { Container } from "react-bootstrap";
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';
import Cabecera from "./header";
import Footer from './footer';
import TimePicker from 'react-time-picker';

registerLocale('es', es);

const schema = z.object({
    nombre: z.string().min(3,{message:  "El nombre es requerido"}),
    apellidos: z.string().min(3, {message: "El apellido es requerido"}),
    email: z.string().email({ message: "Correo invalido" }),
    direccion: z.string().min(3, {message:"La dirección es requerida"}),
    nuip: z.coerce.number()
        .int()
        .min(10000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),
    telefono: z.coerce.number()
        .int()
        .min(1000000, { message: "El número de identificación debe contener mínimo 7 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),
});

export default function Formulario() {
    
    // Calcular la fecha mínima permitida (2 días después de la fecha actual)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);

    const [selectedData, setSelectedDate] = useState(null);

    useEffect(() => {
        document.title = "Agendar Cita"
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Cabecera />
            <div className="div-Formulario d-flex flex-column md-5">
                <h1 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h1>
                <br />
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <h3 className="encabezado-persona">DATOS PERSONALES:</h3>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombre'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nombre</Form.Label>
                                    <Form.Control 
                                        {...register("nombre")} 
                                        className={errors.nombre ? 'input-error' : ''} 
                                        required 
                                        type='text' 
                                    />
                                    {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridApellidos'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Apellido</Form.Label>
                                    <Form.Control 
                                        {...register("apellidos")} 
                                        className={errors.apellidos ? 'input-error' : ''} 
                                        required 
                                    />
                                    {errors.apellidos && (<div style={{ color: "red" }}>{errors.apellidos.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridNuip'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nuip</Form.Label>
                                    <Form.Control 
                                        {...register("nuip")} 
                                        className={errors.nuip ? 'input-error' : ''} 
                                        required 
                                    />
                                    {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formGridEmail'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Correo</Form.Label>
                                    <Form.Control 
                                        {...register("email")} 
                                        type="email" 
                                        className={errors.email ? 'input-error' : ''} 
                                        placeholder="Example@hotmail.com" 
                                        required 
                                    />
                                    {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formGridTelefono'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Telefono</Form.Label>
                                    <Form.Control 
                                        {...register("telefono")} 
                                        className={errors.telefono ? 'input-error' : ''} 
                                        required 
                                    />
                                    {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                </Form.Group>
                            </Row>
                        </div>
                        <div className="container">
                            <h3 className="encabezado-persona">DATOS DE LA MASCOTA:</h3>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombreMascota'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nombre</Form.Label>
                                    <Form.Control {...register("nombreMascota")} required />
                                    {errors.nombreMascota && (<div style={{ color: "red" }}>{errors.nombreMascota.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEspecie">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Especie</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="perro">Perro</option>
                                        <option value="gato">Gato</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </div>
                        <div className="container">
                            <h3 className="encabezado-persona">DATOS DE LA CITA:</h3>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridFecha'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Fecha</Form.Label>
                                    <br />
                                    <DatePicker 
                                        className='calendario' 
                                        selected={selectedData} 
                                        onChange={date => setSelectedDate(date)}
                                        showIcon
                                        toggleCalendarOnIconClick
                                        dateFormat="dd/MM/yyyy"
                                        minDate={minDate}
                                        locale="es"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridHora">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Hora</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="7:00">7 am</option>
                                        <option value="10:00">10 am</option>
                                        <option value="13:00">1 pm</option>
                                        <option value="15:00">3 pm</option>
                                        <option value="18:00">5 pm</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridServicio">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Servicio</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="Estetica">Estetica</option>
                                        <option value="Estetica">Dentista</option>
                                        <option value="Estetica">Guarderia</option>
                                        <option value="General">General</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridDomicilio">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Tipo de domicilio</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="1">recogemos tu mascota</option>
                                        <option value="2">veterinario a domicilio</option>
                                        <option value="3">tu mismo lo traes</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridBarrioAprovado">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Barrio</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="1">San Pedro</option>
                                        <option value="2">primero de mayo</option>
                                        <option value="3">popular modelo</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridDireccion'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Direccion</Form.Label>
                                    <Form.Control 
                                        {...register("direccion")} 
                                        className={errors.direccion ? 'input-error' : ''} 
                                        required 
                                    />
                                    {errors.direccion && (<div style={{ color: "red" }}>{errors.direccion.message}</div>)}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Observaciones (Opcional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Row>
                        </div>
                        <Container className="d-flex justify-content-center align-items-center">
                            <Row>
                                <Col>
                                    <Button
                                        className='btn-submitCita'
                                        variant='primary'
                                        type='submit'
                                        disabled={isSubmitting}>
                                        {isSubmitting ? "Espere..." : "cita solicitada"}
                                    </Button>
                                    {errors.root && (<div>{errors.root.message}</div>)}
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}
