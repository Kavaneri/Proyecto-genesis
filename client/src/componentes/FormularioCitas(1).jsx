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
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';


registerLocale('es', es);

const schema = z.object({
    nombre: z.string().min(3,{message:  "El nombre es requerido"}),
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
    const [showModal, setShowModal] = useState(false);

    // Calcular la fecha mínima permitida (2 días después de la fecha actual)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);

    //capturar datos cliente
    //nuipcliente, correo, telefono, nombres
    const [nuipcliente, setnuipcliente] = useState('');
    const [correo , setcorreo] = useState('');
    const [telefono , settelefono] = useState('');
    const [nombres , setnombres] = useState('');
    
    //caputrar datos mascotacitas
    // nombremascota, raza 
    const [nombremascota, setnombremascota,] = useState('');
    const [raza , setraza] = useState('');

    //capturar datos cita
    //direccion,fechacita,horacita,comentariocliente,idservicio,idtipodomicilio,idmascota, idbarrioaprovado,idestadocita,idcliente 
    const[ direccion,setdireccion]=useState('');
    const[fechacita ,setfechacita]=useState('');
    const[horacita ,sethoracita]=useState('');
    const[comentariocliente ,setcomentariocliente]=useState(' ');
    const[idservicio ,setidservicio]=useState('');
    const[idtipodomicilio ,setidtipodomicilio]=useState('');
    const[idmascota ,setidmascota]=useState('');
    const[idbarrioaprovado ,setidbarrioaprovado]=useState('');
    const[idcliente  ,setidcliente ]=useState('');


    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd'); // Formatea la fecha
        setfechacita(formattedDate);
    };


    
    const [selectedData, setSelectedDate] = useState(null);

    useEffect(() => {
        document.title = "Agendar Cita"
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
    
    const onSubmit = async (data) => {
        try {
            const urlcliente = `http://localhost:5000/clientes`;
            const bodyCliente = {nuipcliente, correo, telefono, nombres};
            const responsecliente = await fetch(urlcliente, {
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyCliente)
            });
            const datacliente = await responsecliente.json();
            console.log("Cliente registrado:", datacliente);
    
            const urlmascota = `http://localhost:5000/mascotascitas`;
            const bodyMascota = {nombremascota, raza};
            const responsemascota = await fetch(urlmascota, {
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyMascota)
            });
            const datamascota = await responsemascota.json();
            console.log("mascota registrada:", datamascota);
    
            const bodyCita = {direccion, fechacita, horacita, comentariocliente,idservicio,idtipodomicilio,idmascota: datamascota.idmascota,idbarrioaprovado,idcliente: datacliente.idcliente  };
            const urlcitas = `http://localhost:5000/citas`;
            const responsecitas = await fetch(urlcitas, {
                method : "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyCita)
            });
            const datacitas = await responsecitas.json();
            console.log("solicitud cita:", datacitas);
    
            // Mostrar modal de éxito
            setShowModal(true);
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
                                <Form.Label className='etiqueta' style={{ color: 'white' }}> Nombre </Form.Label>
                                <Form.Control 
                                    {...register("nombre", {required: "el nombre es obligatorio"})}
                                    value={nombres} onChange={(e) => setnombres(e.target.value)} 
                                    className={errors.nombre ? 'input-error' : ''} 
                                    required 
                                    type='text' 
                                />
                                {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridNuip'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nuip</Form.Label>
                                    <Form.Control 
                                            {...register("nuip", { 
                                                required: "El número de identificación es obligatorio", 
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={nuipcliente} 
                                            onChange={(e) => setnuipcliente(parseInt(e.target.value, 10))} 
                                        />
                                    {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formGridEmail'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Correo</Form.Label>
                                    <Form.Control 
                                        {...register("email", { required: "El correo electrónico es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "El correo electrónico no es válido" } })}
                                        type="email" 
                                        className={errors.email ? 'input-error' : ''} 
                                        placeholder="Example@hotmail.com" 
                                        required 
                                        value = {correo}
                                        onChange={(e) => setcorreo(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formGridTelefono'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Telefono</Form.Label>
                                    <Form.Control 
                                            {...register("telefono", { 
                                                required: "El teléfono es obligatorio",
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={telefono} 
                                            onChange={(e) => settelefono(parseInt(e.target.value,10))} />
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
                                    <Form.Control 
                                        {...register("nombremascota", {required: "el nombre de la mascota es obligatoria"})}
                                        value={nombremascota} onChange={(e) => setnombremascota(e.target.value)} 
                                        className={errors.nombre ? 'input-error' : ''} 
                                        required 
                                        type='text' 
                                    />
                                    {errors.nombreMascota && (<div style={{ color: "red" }}>{errors.nombreMascota.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombre'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}> raza </Form.Label>
                                    <Form.Control 
                                        {...register("raza", {required: "la raza es obligatoria"})}
                                        value={raza} onChange={(e) => setraza(e.target.value)} 
                                        className={errors.nombre ? 'input-error' : ''} 
                                        required 
                                        type='text' 
                                    />
                                    {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
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
                                            selected={fechacita ? new Date(fechacita) : null} // Convierte la fecha de nuevo a objeto Date si no es nulo
                                            onChange={handleDateChange}
                                            showIcon
                                            toggleCalendarOnIconClick
                                            dateFormat="dd/MM/yyyy"
                                            minDate={minDate}
                                            locale="es"
                                        />
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridHora'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Hora</Form.Label>
                                    <Form.Select
                                        defaultValue="" 
                                        onChange={(e) => sethoracita(e.target.value, 10)}>
                                        <option value="" disabled>Choose...</option>
                                        <option value="7:00">7 am</option>
                                        <option value="10:00">10 am</option>
                                        <option value="13:00">1 pm</option>
                                        <option value="15:00">3 pm</option>
                                        <option value="18:00">5 pm</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridServicio">
                                <Form.Label className='etiqueta' style={{ color: 'white' }}>Servicio</Form.Label>
                                <Form.Select 
                                    defaultValue="" 
                                    onChange={(e) => setidservicio(parseInt(e.target.value, 10))}>
                                    <option value="" disabled>Choose...</option>
                                    <option value="2">baño perro</option>
                                    <option value="4">baño gato</option>
                                    <option value="5">cita general perro</option>
                                    <option value="6">cita general gato</option>
                                    <option value="7">cita dentita perro</option>
                                    <option value="8">cita dentita gato</option>
                                </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridDomicilio">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Tipo de domicilio</Form.Label>
                                    <Form.Select 
                                        defaultValue="" 
                                        onChange={(e) => setidtipodomicilio(parseInt(e.target.value, 10))}>
                                        <option value="" disabled>Choose...</option>
                                        <option value="NULL" >...</option>
                                        <option value="3">recogemos tu mascota</option>
                                        <option value="4">veterinario a domicilio</option>
                                        <option value="5">tu mismo lo traes</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridBarrioAprovado">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Barrio</Form.Label>
                                    <Form.Select 
                                        defaultValue="" 
                                        onChange={(e) => setidbarrioaprovado(parseInt(e.target.value, 10))}>
                                        <option value="NULL" >...</option>
                                        <option value="15">San Pedro</option>
                                        <option value="16">primero de mayo</option>
                                        <option value="17">popular modelo</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridDireccion'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Direccion</Form.Label>
                                    <Form.Control 
                                        {...register("direccion", {required: "el direccion es obligatorio"})} 
                                        type ='direccion' value={direccion} onChange={(e)=>setdireccion(e.target.value)}
                                        className={errors.nombre ? 'input-error' : ''} 
                                        required 
                                    />
                                    {errors.direccion && (<div style={{ color: "red" }}>{errors.direccion.message}</div>)}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Observaciones (Opcional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} 
                                        {...register("comentariocliente")} 
                                        type ='comentariocliente' 
                                        value={comentariocliente} 
                                        onChange={(e)=>setcomentariocliente(e.target.value)} 
                                        className={errors.nombre ? 'input-error' : ''} 
                                        required 
                                    />
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
            

            {/* Modal para confirmar la cita registrada */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Venta Registrada</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tu solicitud fue presentada con exito</Modal.Body>
                <Modal.Body>Tenviaremos la confirmacion a tu correo las proximas 36 horas.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)} href='/'>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        
    );
}
