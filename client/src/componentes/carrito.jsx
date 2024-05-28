import React, { useContext, useEffect, useState } from 'react';
import Cabecera from './header';
import { ShopContext } from './context-shop/context-shop';
import CarritoDetalle from './carrtioDetalle';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './carrito.css';
import { Link } from 'react-router-dom';

export default function Carrito() {
    // Variables cliente
    const [nuipcliente, setnuipcliente] = useState('');
    const [correo, setcorreo] = useState('');
    const [telefono, settelefono] = useState('');
    const [nombres, setnombres] = useState('');

    // Variables ventas
    const [fechaventa, setfechaventa] = useState('');
    const [valortotal, setvalortotal] = useState(0);
    const [direccion, setdireccion] = useState('');
    const [idbarriosaprovado, setidbarriosaprovado] = useState(0);
    const [idcliente, setidcliente] = useState('');

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const barrios = [
        { id: 15, nombre: 'Barrio 1' },
        { id: 16, nombre: 'Barrio 2' },
        { id: 17, nombre: 'Barrio 3' },
    ];

    useEffect(() => {
        document.title = 'Mi Carrito';

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        setfechaventa(formattedDate);
    }, []);

    const { detalleCompra, getSubtotalProductos, getCantidadProductos, productos } = useContext(ShopContext);
    const cantidad = getCantidadProductos();
    const subtotal = getSubtotalProductos();
    const envio = 10000;
    const total = subtotal + envio;

    const validateForm = () => {
        const newErrors = {};

        if (!nuipcliente) newErrors.nuipcliente = 'NUIP Cliente es obligatorio.';
        if (!correo) newErrors.correo = 'Correo es obligatorio.';
        if (!telefono) {
            newErrors.telefono = 'Teléfono es obligatorio.';
        } else if (!/^\d{10}$/.test(telefono)) {
            newErrors.telefono = 'El teléfono debe tener 10 dígitos y ser numérico.';
        }
        if (!nombres) newErrors.nombres = 'Nombres son obligatorios.';
        if (!direccion) newErrors.direccion = 'Dirección es obligatoria.';
        if (idbarriosaprovado === 0) newErrors.idbarriosaprovado = 'Debe seleccionar un barrio.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setvalortotal(total);

        try {
            const urlcliente = `http://localhost:5000/clientes`;
            const bodyCliente = { nuipcliente, correo, telefono, nombres };

            const responsecliente = await fetch(urlcliente, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyCliente)
            });
            const datacliente = await responsecliente.json();
            console.log("cliente registrado:", datacliente);
            setidcliente(datacliente.idcliente);

            const bodyVenta = { fechaventa, valortotal: total, direccion, idbarriosaprovado, idcliente: datacliente.idcliente };
            const urlventa = `http://localhost:5000/ventas`;
            const responseventa = await fetch(urlventa, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyVenta)
            });
            console.log(bodyVenta);
            const dataventa = await responseventa.json();
            console.log("venta registrada:", dataventa);

            setShowModal(true);

        } catch (error) {
            console.error(error);
        }
    };

    const estilosDetalle = () => {
        let estilo = 'div-resumen-show';
        if (cantidad === 0) {
            estilo = 'div-resumen-hide';
        }
        return estilo;
    };

    const renderUps = () => {
        if (cantidad === 0) {
            return (
                <div className='d-flex w-100 justify-content-center align-items-center carro-vacio'>
                    <section className='text-center'>
                        <p>
                            Tal parece que aún no has visitado nuestra tienda <br></br> Te invitamos a visitar nuestra tienda
                        </p>
                    </section>
                </div>
            );
        }
    };

    return (
        <>
            <Cabecera />

            <Container fluid>
                <Row className='justify-content-center'>
                    {renderUps()}
                    <Col className='col-detalles' xs='8'>
                        <div className='div-detalle'>
                            {productos.map((product) => {
                                if (detalleCompra[product.id]?.cantidad > 0) {
                                    return <CarritoDetalle data={product} key={product.id} />;
                                }
                            })}
                        </div>
                    </Col>

                    <Col className='col-resumen'>
                        <div className={estilosDetalle()}>
                            <Card>
                                <form onSubmit={onSubmit}>
                                    <Card.Body>
                                        <Card.Header>
                                            <strong>Datos venta</strong>
                                        </Card.Header>
                                        <Row>
                                            <Col xs={6}>
                                                <input
                                                    type='text'
                                                    value={nuipcliente}
                                                    onChange={(e) => setnuipcliente(e.target.value)}
                                                    placeholder='NUIP Cliente'
                                                    className={`form-control my-2 ${errors.nuipcliente ? 'is-invalid' : ''}`}
                                                />
                                                {errors.nuipcliente && <div className='text-danger'>{errors.nuipcliente}</div>}
                                            </Col>
                                            <Col xs={6}>
                                                <input
                                                    type='email'
                                                    value={correo}
                                                    onChange={(e) => setcorreo(e.target.value)}
                                                    placeholder='Correo'
                                                    className={`form-control my-2 ${errors.correo ? 'is-invalid' : ''}`}
                                                />
                                                {errors.correo && <div className='text-danger'>{errors.correo}</div>}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <input
                                                    type='tel'
                                                    value={telefono}
                                                    onChange={(e) => settelefono(e.target.value)}
                                                    placeholder='Teléfono'
                                                    className={`form-control my-2 ${errors.telefono ? 'is-invalid' : ''}`}
                                                />
                                                {errors.telefono && <div className='text-danger'>{errors.telefono}</div>}
                                            </Col>
                                            <Col xs={6}>
                                                <input
                                                    type='text'
                                                    value={nombres}
                                                    onChange={(e) => setnombres(e.target.value)}
                                                    placeholder='Nombres'
                                                    className={`form-control my-2 ${errors.nombres ? 'is-invalid' : ''}`}
                                                />
                                                {errors.nombres && <div className='text-danger'>{errors.nombres}</div>}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={6}>
                                                <input
                                                    type='text'
                                                    value={direccion}
                                                    onChange={(e) => setdireccion(e.target.value)}
                                                    placeholder='Dirección'
                                                    className={`form-control my-2 ${errors.direccion ? 'is-invalid' : ''}`}
                                                />
                                                {errors.direccion && <div className='text-danger'>{errors.direccion}</div>}
                                            </Col>
                                            <Col xs={6}>
                                                <select
                                                    value={idbarriosaprovado}
                                                    onChange={(e) => setidbarriosaprovado(parseInt(e.target.value, 10))}
                                                    className={`form-control my-2 ${errors.idbarriosaprovado ? 'is-invalid' : ''}`}
                                                >
                                                    <option value=''>Seleccionar Barrio</option>
                                                    {barrios.map((barrio) => (
                                                        <option key={barrio.id} value={barrio.id}>
                                                            {barrio.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.idbarriosaprovado && <div className='text-danger'>{errors.idbarriosaprovado}</div>}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                    <Card.Body>
                                        <Card.Header>
                                            <strong>Resumen</strong>
                                        </Card.Header>
                                        <Card.Text className='d-flex flex-column'>
                                            <p className='fw-light'>
                                                Subtotal ${subtotal}
                                            </p>
                                            <p className='fw-light'>Envio: ${envio}</p>
                                            <p className='fw-light'>Total ${total}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Button className='mb-4 w-100' variant='success' type='submit'>
                                            Pagar
                                        </Button>
                                    </Card.Body>
                                </form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='d-flex justify-content-center align-items-start my-5 boton-regreso-compras'>
                <Link className='mb-4 w-50' to='/Comida'>
                    Continuar comprando
                </Link>
            </div>

            {/* Modal para confirmar la venta registrada */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Venta Registrada</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tu venta ha sido registrada con éxito.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} href='/'>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
