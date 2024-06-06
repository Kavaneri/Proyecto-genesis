import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z , ZodSchema } from 'zod';
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

export default function Formulario() {
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


    const usuario = sessionStorage.getItem('usuario');
    const [showModal, setShowModal] = useState(false);


    // Definir el esquema de validación
   // Definir el esquema de validación
   let schema;
   if (usuario === null) {
       schema = z.object({
           nombres: z.string().min(3, { message: "El nombre es requerido y debe tener al menos 3 caracteres" }),
           nuipcliente: z.coerce.number()
           .int()
           .min(10000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
           .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),
           
           raza: z.string().min(3, { message: "La raza es requerida y debe tener al menos 3 caracteres" }),
           email: z.string().email({ message: "Correo inválido" }),
           direccion: z.string().min(3, { message: "La dirección es requerida y debe tener al menos 3 caracteres" }),

           telefono: z.coerce.number()
               .int()
               .min(1000000, { message: "El número de teléfono debe contener mínimo 7 cifras" })
               .max(9999999999, { message: "El número de teléfono debe contener máximo 10 cifras" }),
       });
   } 
       schema = z.object({
           nombremascota: z.string().min(3, { message: "El nombre de la mascota es requerido y debe tener al menos 3 caracteres" }),
           raza: z.string().min(2, { message: "La raza es requerida y debe tener al menos 2 caracteres" }),
           direccion: z.string().min(6, { message: "La dirección es requerida y debe tener al menos 6 caracteres" }),
       });


    // Calcular la fecha mínima permitida (2 días después de la fecha actual)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30)
    const isSunday = (date) => {
        const day = date.getDay();
        return day !== 0; // 0 es domingo en JavaScript
    };
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
            let bodyCliente = {nuipcliente, correo, telefono, nombres}; // inicialización con let en lugar de const

        if(usuario != null){
            const usuarioObj = JSON.parse(usuario);
            const { nuipusuario, correo: correoUsuario, telefono: telefonoUsuario, nombre } = usuarioObj;
            bodyCliente = { nuipcliente: nuipusuario, correo: correoUsuario, telefono: telefonoUsuario, nombres: nombre };
        }
        

            const urlcliente = `http://localhost:5000/clientes`;
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
            
            console.log(bodyCita);
            console.log(bodyCliente);
            console.log(bodyMascota);
            const datacitas = await responsecitas.json();
            console.log("solicitud cita:", datacitas);
    
            // Mostrar modal de éxito
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    if(usuario == null){
        return (
            <>
                <Cabecera />
                <div className="div-Formulario d-flex flex-column md-5">
                    <h1 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h1>
                    <br />
                    <div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="container">
                                <div className="lineasblancas">
                                    <h3 className="encabezado-persona">DATOS PERSONALES</h3>
                                </div>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Col} className='mb-4' controlId='formGridNombre'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}> Nombres </Form.Label>
                                        <Form.Control 
                                            {...register("nombres")}
                                            value={nombres} 
                                            onChange={(e) => setnombres(e.target.value)} 
                                            className={errors.nombres ? 'input-error' : ''} 
                                            required 
                                            type='text' 
                                        />
                                        {errors.nombre && (<div style={{ color: "red" }}>{errors.nombres.message}</div>)}
                                    </Form.Group>
                                    <Form.Group as={Col} className='mb-4' controlId='formGridNuip'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Nuip</Form.Label>
                                        <Form.Control 
                                            {...register("nuipcliente", { 
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={nuipcliente} 
                                            onChange={(e) => setnuipcliente(parseInt(e.target.value, 10))} 
                                        />
                                        {errors.nuipcliente && (<div style={{ color: "red" }}>{errors.nuipcliente.message}</div>)}
                                    </Form.Group>
                                    <Form.Group className='mb-4' controlId='formGridEmail'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Correo</Form.Label>
                                        <Form.Control 
                                            {...register("email", { required: "El correo electrónico es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "El correo electrónico no es válido" } })}
                                            type="email" 
                                            className={errors.email ? 'input-error' : ''} 
                                            placeholder="Example@hotmail.com" 
                                            required 
                                            value={correo}
                                            onChange={(e) => setcorreo(e.target.value)}
                                        />
                                        {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                    </Form.Group>
                                    <Form.Group className='mb-4' controlId='formGridTelefono'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Teléfono</Form.Label>
                                        <Form.Control 
                                            {...register("telefono", { 
                                                required: "El teléfono es obligatorio",
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })} 
                                            value={telefono} 
                                            onChange={(e) => settelefono(parseInt(e.target.value, 10))} 
                                        />
                                        {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                    </Form.Group>
                                </Row>
                            </div>
                            <div className="container">
                                <div className="lineasblancas">
                                    <h3 className="encabezado-persona">DATOS DE LA MASCOTA</h3>
                                </div>
                                <br />
                                
                                <Row className="mb-3">
                                    <Form.Group as={Col} className='mb-4' controlId='formGridNombreMascota'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Nombre Mascota</Form.Label>
                                        <Form.Control
                                            {...register("nombremascota")}
                                            value={nombremascota}
                                            onChange={(e) => setnombremascota(e.target.value)}
                                            className={errors.nombremascota ? 'input-error' : ''}
                                        />
                                        {errors.nombremascota && (<div style={{ color: "red" }}>{errors.nombremascota.message}</div>)}
                                    </Form.Group>
                                    <Form.Group as={Col} className='mb-4' controlId='formGridRaza'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Raza</Form.Label>
                                        <Form.Control
                                            {...register("raza")}
                                            value={raza}
                                            onChange={(e) => setraza(e.target.value)}
                                            className={errors.raza ? 'input-error' : ''}
                                        />
                                        {errors.raza && (<div style={{ color: "red" }}>{errors.raza.message}</div>)}
                                    </Form.Group>
                                </Row>
                            </div>
                            <div className="container">
                                <div className="lineasblancas">
                                    <h3 className="encabezado-persona">DATOS DE LA CITA</h3>
                                </div>
                                <br />
                                <Row className="mb-3">
                                    <Form.Group as={Col} className='mb-4' controlId='formGridFecha'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Fecha</Form.Label>
                                        <br />
                                        <DatePicker
                                            className='calendario'
                                            selected={fechacita ? new Date(fechacita) : null} // Convierte la fecha de nuevo a objeto Date si no es nulo
                                            onChange={date => setfechacita(date)}
                                            showIcon
                                            toggleCalendarOnIconClick
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            locale="es"
                                            filterDate={isSunday} 
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} className='mb-4' controlId='formGridHora'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Hora</Form.Label>
                                        <Form.Select
                                            defaultValue="" 
                                            onChange={(e) => sethoracita(e.target.value, 10)}>
                                            <option value="" disabled>Choose...</option>
                                            <option value="7:00">7 am</option>
                                            <option value="8:00">8 am</option>
                                            <option value="9:00">9 am</option>
                                            <option value="10:00">10 am</option>
                                            <option value="11:00">11 am</option>
                                            <option value="14:00">2 pm</option>
                                            <option value="15:00">3 pm</option>
                                            <option value="16:00">4 pm</option>
                                            <option value="17:00">5 pm</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridServicio">
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Servicio</Form.Label>
                                        <Form.Select 
                                            defaultValue="" 
                                            onChange={(e) => setidservicio(parseInt(e.target.value, 10))}>
                                            <option value="" disabled>Choose...</option>
                                            <option value="2">Profilaxis</option>
                                            <option value="3">Castrar</option>
                                            <option value="4">Ecografía</option>
                                            <option value="5">Radiografía</option>
                                            <option value="6">Cita general</option>
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
                                            <option value="NULL">...</option>
                                            <option value="3">Recogemos tu mascota</option>
                                            <option value="4">Veterinario a domicilio</option>
                                            <option value="5">Presencial</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridBarrioAprovado">
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Barrio</Form.Label>
                                        <Form.Select 
                                            defaultValue="" 
                                            onChange={(e) => setidbarrioaprovado(parseInt(e.target.value, 10))}>
                                            <option value="NULL">...</option>
                                            <option value="15">Las Delicias</option>
                                            <option value="16">El Prado</option>
                                            <option value="17">El Recreo</option>
                                            <option value="18">Caimitos</option>
                                            <option value="19">Olímpico</option>
                                            <option value="20">Cincuentenario</option>
                                            <option value="21">San Carlos</option>
                                            <option value="22">Villa Claudia</option>
                                            <option value="23">Las Mercedes</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} className='mb-4' controlId='formGridDireccion'>
                                        <Form.Label className='etiqueta' style={{ color: 'white' }}>Dirección</Form.Label>
                                        <Form.Control 
                                            {...register("direccion", {required: "La dirección es obligatoria"})} 
                                            type='text' 
                                            value={direccion} 
                                            onChange={(e) => setdireccion(e.target.value)}
                                            className={errors.direccion ? 'input-error' : ''} 
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
                                            type='text' 
                                            value={comentariocliente} 
                                            onChange={(e) => setcomentariocliente(e.target.value)} 
                                        />
                                    </Form.Group>
                                </Row>
                            </div>
                            <Container className="d-flex justify-content-center align-items-center">
                                <Row>
                                    <Col>
                                        <Button
                                            className='btn-submitCita btndec'
                                            variant='primary'
                                            type='submit'
                                            disabled={isSubmitting}>
                                            {isSubmitting ? "Espere..." : "Solicitar cita"}
                                        </Button>
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
                        <Modal.Title>Solicitud cita registrada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu solicitud fue presentada con éxito</Modal.Body>
                    <Modal.Body>Te enviaremos la confirmación a tu correo en las próximas 36 horas.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)} href='/'>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
        
    }
    else{   
    return (
        <>
            <Cabecera />
            
            <div className="div-Formulario d-flex flex-column md-5">
                
                <h1 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h1>
                <br />
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <div className="lineasblancas"> 
                                <h3 className="encabezado-persona">DATOS DE LA MASCOTA</h3>
                            </div>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombreMascota'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nombre</Form.Label>
                                    <Form.Control 
                                        {...register("nombremascota", {required: "el nombre de la mascota es obligatoria"})}
                                        value={nombremascota} onChange={(e) => setnombremascota(e.target.value)} 
                                        className={errors.nombremascota ? 'input-error' : ''} 
                                        required 
                                        type='text' 
                                    />
                                    {errors.nombreMascota && (<div style={{ color: "red" }}>{errors.nombreMascota.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombre'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}> Raza </Form.Label>
                                    <Form.Control 
                                        {...register("raza", {required: "la raza es obligatoria"})}
                                        value={raza} onChange={(e) => setraza(e.target.value)} 
                                        className={errors.razamascota ? 'input-error' : ''} 
                                        required 
                                        type='text' 
                                    />
                                    {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                </Form.Group>
                                
                            </Row>
                        </div>

                        <div className="container">
                            <div className="lineasblancas"> 
                                <h3 className="encabezado-persona">DATOS DE LA CITA</h3>
                            </div>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridFecha'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Fecha</Form.Label>
                                    <br />
                                        <DatePicker
                                            className='calendario'
                                            selected={fechacita ? new Date(fechacita) : null} // Convierte la fecha de nuevo a objeto Date si no es nulo
                                            onChange={date => setfechacita(date)}
                                            showIcon
                                            toggleCalendarOnIconClick
                                            dateFormat="yyyy-MM-dd"
                                            minDate={minDate}
                                            maxDate={maxDate}
                                            locale="es"
                                            filterDate={isSunday} 
                                        />
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridHora'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Hora</Form.Label>
                                    <Form.Select
                                        defaultValue="" 
                                        onChange={(e) => sethoracita(e.target.value, 10)}>
                                        <option value="" disabled>Choose...</option>
                                        <option value="7:00">7 am</option>
                                        <option value="8:00">8 am</option>
                                        <option value="9:00">9 pm</option>
                                        <option value="10:00">10 am</option>
                                        <option value="11:00">11 am</option>
                                        <option value="14:00">2 pm</option>
                                        <option value="15:00">3 pm</option>
                                        <option value="16:00">4 pm</option>
                                        <option value="17:00">5 pm</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridServicio">
                                <Form.Label className='etiqueta' style={{ color: 'white' }}>Servicio</Form.Label>
                                <Form.Select 
                                    defaultValue="" 
                                    onChange={(e) => setidservicio(parseInt(e.target.value, 10))}>
                                    <option value="" disabled>Choose...</option>
                                        <option value="2">profilaxis</option>
                                        <option value="3">castrar</option>
                                        <option value="4">ecografia</option>
                                        <option value="5">radiografia</option>
                                        <option value="6">cita general</option>
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
                                        <option value="5">presencial</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridBarrioAprovado">
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Barrio</Form.Label>
                                    <Form.Select 
                                        defaultValue="" 
                                        onChange={(e) => setidbarrioaprovado(parseInt(e.target.value, 10))}>
                                        <option value="NULL" >...</option>
                                        <option value="15">Las Delicias</option>
                                        <option value="16">El Prado</option>
                                        <option value="17">El Recreo</option>
                                        <option value="18">Caimitos</option>
                                        <option value="19">Olímpico</option>
                                        <option value="20">Cincuentenario</option>
                                        <option value="21">San Carlos</option>
                                        <option value="22">Villa Claudia</option>
                                        <option value="23">Las Mercedes</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridDireccion'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Direccion</Form.Label>
                                    <Form.Control 
                                        {...register("direccion", {required: "el direccion es obligatorio"})} 
                                        type ='direccion' value={direccion} onChange={(e)=>setdireccion(e.target.value)}
                                        className={errors.direccion ? 'input-error' : ''} 
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
                                    />
                                </Form.Group>
                            </Row>
                        </div>
                        <Container className="d-flex justify-content-center align-items-center">
                            <Row>
                                <Col>
                                    <Button
                                        className='btn-submitCita btndec'
                                        variant='primary'
                                        type='submit'
                                        disabled={isSubmitting}>
                                        {isSubmitting ? "Espere..." : "Solicitar cita"}
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
                <Modal.Title>Solicitud de cita Registrada</Modal.Title>
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
}
