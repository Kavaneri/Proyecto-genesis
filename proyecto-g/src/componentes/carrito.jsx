import React, { useContext } from 'react'
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
import CardTitle from 'react-bootstrap/esm/CardTitle';
import CardText from 'react-bootstrap/esm/CardText';
import CardHeader from 'react-bootstrap/esm/CardHeader';


export default function Carrito() {

  const { detalleCompra, getSubtotalProductos } = useContext(ShopContext)
  const cant = getSubtotalProductos()
  return (
    <>
      <Cabecera />

      <Container fluid>
        <Row className='justify-content-md-center' >
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
                <div className=' div-resumen'>
                    <Card>
                      <CardBody>
                        <CardHeader><strong>Resumen</strong></CardHeader>
                        <CardText className='d-flex flex-column'>
                          <p className='fw-light'>Cantidad de productos ${cant}</p>     
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
    </>

  )
}
