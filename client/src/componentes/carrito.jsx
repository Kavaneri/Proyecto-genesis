import React, { useContext, useEffect, useState } from 'react';
import Cabecera from './header';
import { PRODUCTS } from './productos';
import { ShopContext } from './context-shop/context-shop';
import CarritoDetalle from './carrtioDetalle';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './carrito.css';
import CardBody from 'react-bootstrap/esm/CardBody';
import CardText from 'react-bootstrap/esm/CardText';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';

export default function Carrito() {
  // Variables cliente
  const [nuipcliente, setnuipcliente] = useState('');
  const [correo, setcorreo] = useState('');
  const [telefono, settelefono] = useState('');
  const [nombres, setnombres] = useState('');

  // Variables ventas
  //fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente 
  const [fechaventa , setfechaventa] = useState('');
  const [valortotal , setvalortotal] = useState('');
  const [direccion, setdireccion] = useState('');
  const [idbarriosaprovado, setidbarriosaprovado] = useState('');
  const [idcliente , setidcliente] = useState('');


  useEffect(() => {
    document.title = 'Mi Carrito';
  });

  const { detalleCompra, getSubtotalProductos, getCantidadProductos } = useContext(ShopContext);
  const cantidad = getCantidadProductos();
  const cant = getSubtotalProductos();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlcliente = `http://localhost:5000/clientes`;
      const bodyCliente = { nuipcliente, correo, telefono, nombres };
      const bodyventa = {direccion, idbarriosaprovado};
      console.log(bodyCliente);
      console.log(bodyventa);
      console.log('aqui');
      /*
      const responsecliente = await fetch(urlcliente, {
          method : "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(bodyCliente)
      });
      const datacliente = await responsecliente.json();
      console.log("cliente registrado:", datacliente);

      const urlventa = `http://localhost:5000/ventas`;
      const bodyVenta = {};
      const responseventa = await fetch(urlventa, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyVenta)
      });
      const dataventa = await responseventa.json();
       console.log("venta registrada:", dataventa);*/
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
              {PRODUCTS.map((product) => {
                if (detalleCompra[product.id] !== 0) {
                  return <CarritoDetalle data={product} key={product.id} />;
                }
              })}
            </div>
          </Col>

          <Col className='col-resumen'>
            <div className={estilosDetalle()}>
              <Card>
                <form onSubmit={onSubmit}>
                  <CardBody>
                    <CardHeader>
                      <strong>Datos venta</strong>
                    </CardHeader>
                    <Row>
                      <Col xs={6}>
                        <input
                          type='text'
                          value={nuipcliente}
                          onChange={(e) => setnuipcliente(e.target.value)}
                          placeholder='NUIP Cliente'
                          className='form-control my-2'
                        />
                      </Col>
                      <Col xs={6}>
                        <input
                          type='email'
                          value={correo}
                          onChange={(e) => setcorreo(e.target.value)}
                          placeholder='Correo'
                          className='form-control my-2'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <input
                          type='tel'
                          value={telefono}
                          onChange={(e) => settelefono(e.target.value)}
                          placeholder='Teléfono'
                          className='form-control my-2'
                        />
                      </Col>
                      <Col xs={6}>
                        <input
                          type='text'
                          value={nombres}
                          onChange={(e) => setnombres(e.target.value)}
                          placeholder='Nombres'
                          className='form-control my-2'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <input
                          type='text'
                          value={direccion}
                          onChange={(e) => setdireccion(e.target.value)}
                          placeholder='Dirección'
                          className='form-control my-2'
                        />
                      </Col>
                      <Col xs={6}>
                        <input
                          type='text'
                          value={idbarriosaprovado}
                          onChange={(e) => setidbarriosaprovado(e.target.value)}
                          placeholder='ID Barrios Aprovado'
                          className='form-control my-2'
                        />
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody>
                    <CardHeader>
                      <strong>Resumen</strong>
                    </CardHeader>
                    <CardText className='d-flex flex-column'>
                      <p className='fw-light'>Subtotal ${cant}</p>
                      <p className='fw-light'>Envio</p>
                      <p className='fw-light'>Total</p>
                    </CardText>
                  </CardBody>
                  <CardBody>
                    <Button className='mb-4 w-100' variant='success' type='submit'>
                      Pagar
                    </Button>
                  </CardBody>
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
    </>
  );
}
