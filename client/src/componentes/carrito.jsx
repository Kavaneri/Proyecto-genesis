import React, { useContext, useEffect, useState, } from 'react'
import Cabecera from './header'
import { PRODUCTS } from './productos'
import { ShopContext } from './context-shop/context-shop';
import CarritoDetalle from './carrtioDetalle';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './carrito.css'
import CardBody from 'react-bootstrap/esm/CardBody';
import CardText from 'react-bootstrap/esm/CardText';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';
import { date } from 'zod';


export default function Carrito() {
  //variables cliente
  //nuipcliente, correo, telefono, nombres
  const [nuipcliente, setnuipcliente] = useState('');
  const [correo , setcorreo] = useState('');
  const [telefono , settelefono] = useState('');
  const [nombres , setnombres] = useState('');

  //variables ventas
  //fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente
  const [fechaventa, setfechaventa] = useState('');
  const [valortotal, servalortotal] = useState('');
  const [direccion ,setdireccion]=useState('');
  const [idbarriosaprovado ,setidbarriosaprovado]=useState('');
  const [idestadoventa ,setidestadoventa]=useState('');
  const [idcliente ,setidcliente]=useState('');

  const handleDateChange = (date) => {
    setfechaventa(new date());
  };
  
  useEffect(() =>{
    document.title= "Mi Carrito"
  })

  const { detalleCompra, getSubtotalProductos, getCantidadProductos } = useContext(ShopContext)
  const cantidad = getCantidadProductos()
  const cant = getSubtotalProductos()


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
      console.log("cliente registrado:", datacliente);

      const urlventa = `http://localhost:5000/ventas`;
      const bodyVenta = {};
      const responseventa = await fetch(urlventa, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyVenta)
      });
      const dataventa = await responseventa.json();
       console.log("venta registrada:", dataventa);

        //console.log(data);
    } catch (error) {
        console.error(error);
    }
};

  const estilosDetalle = () => {
    let estilo = "div-resumen-show"
    if (cantidad === 0) {
      estilo = "div-resumen-hide"
    }
    return estilo
  }

  const renderUps = () => {
    if (cantidad === 0) {
      return (
        <div className='d-flex w-100 justify-content-center align-items-center carro-vacio'>
          <section className='text-center'>
            <p>Tal parece que aún no has visitado nuestra tienda <br></br> Te invitamos a visitar nuestra tienda</p>
          </section>

        </div>);
    }
  }

  return (
    <>
      <Cabecera />

      <Container fluid>
        <Row className='justify-content-center' >
          {renderUps()}
          <Col className='col-detalles' xs='8'>
            <div className='div-detalle'>

              {PRODUCTS.map((product) => {
                if (detalleCompra[product.id] !== 0) {
                  return <CarritoDetalle data={product} />
                }
              })}
            </div>
          </Col>

          <Col className='col-resumen'>
            <div className={estilosDetalle()}>
              <Card>
                <CardBody>
                  <CardHeader><strong>Datos venta</strong></CardHeader>
                                <form onSubmit={onSubmit}>
                    <div>
                      <label>
                        NUIP Cliente:
                        <input
                          type="text"
                          value={nuipcliente}
                          onChange={(e) => setnuipcliente(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Correo:
                        <input
                          type="email"
                          value={correo}
                          onChange={(e) => setcorreo(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Teléfono:
                        <input
                          type="tel"
                          value={telefono}
                          onChange={(e) => settelefono(e.target.value)}
                        />
                      </label>
                    </div>
                    <div>
                      <label>
                        Nombres:
                        <input
                          type="text"
                          value={nombres}
                          onChange={(e) => setnombres(e.target.value)}
                        />
                      </label>
                    </div>
                    <button type="submit">Enviar</button>
                  </form>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardHeader><strong>Resumen</strong></CardHeader>
                  <CardText className='d-flex flex-column'>
                    <p className='fw-light'>Subtotal ${cant}</p>
                    <p className='fw-light'>Envio</p>
                    <p className='fw-light'>Total</p>
                  </CardText>
                  <Button className='mb-4 w-100' variant='success' type='submit'>Pagar</Button>
                </CardBody>

              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='d-flex justify-content-center align-items-start my-5 boton-regreso-compras'>

      {/* 

                          PECADO CONTRA DIOS No. 10
      La excusa de botón que me inventé es necesario porque aún no se como 
      persistir los productos que se han agregado hasta ahora.

      Por el momento se utiliza una etiqueta Link del hook react-router-dom para
      que no se pierda la información contenida en el objeto detalleCompra.Cuando lo 
      arregle utilizaré un botón decente
      <Button className='mb-4 w-50' variant='outline-primary'>Continuar comprando</Button> 
      
      */}
      <Link className='mb-4 w-50' to='/Comida'>Continuar comprando</Link>
      </div>
    </>

  )
}
