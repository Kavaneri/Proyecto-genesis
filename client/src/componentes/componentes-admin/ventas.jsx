import React, { useEffect, useState } from 'react'
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Tab, Tabs } from 'react-bootstrap'
import Cabecera from '../header'
import DataTable from 'react-data-table-component'

export default function Ventas() {
  // Estados para almacenar los datos
  const [ventas, setVentas] = useState([])
  const [barrios, setBarrios] = useState([])
  const [estadosVentas, setEstadosVentas] = useState([])
  const [clientes, setClientes] = useState([])
  const [detallesVenta, setDetallesVenta] = useState([])

  // Estados para la venta seleccionada
  const [selectedRow, setSelectedRow] = useState(null)
  const [productos, setProductos] = useState([])
  const [datosUsuario, setDatosUsuario] = useState([])

  // Cargar datos de la API
  useEffect(() => {
    fetch('http://localhost:5000/ventas')
      .then(res => res.json())
      .then(data => setVentas(data))

    fetch('http://localhost:5000/barriosaprovados')
      .then(res => res.json())
      .then(data => setBarrios(data))

    fetch('http://localhost:5000/estadosventas')
      .then(res => res.json())
      .then(data => setEstadosVentas(data))

    fetch('http://localhost:5000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))

    fetch('http://localhost:5000/detalleventa')
      .then(res => res.json())
      .then(data => setDetallesVenta(data))
  }, [])

  // Actualizar detalles de la venta seleccionada
  useEffect(() => {
    if (selectedRow) {
      const detalles = detallesVenta.filter(detalle => detalle.idventa === selectedRow.idventa)
      const cliente = clientes.find(cliente => cliente.idcliente === selectedRow.idcliente)
      setProductos(detalles)
      setDatosUsuario(cliente)
    }
  }, [selectedRow, detallesVenta, clientes])

  // Columnas de la tabla de ventas
  const columnsVentas = [
    {
      name: "ID Venta",
      selector: row => row.idventa
    },
    {
      name: "Fecha",
      selector: row => new Date(row.fechaventa).toLocaleDateString()
    },
    {
      name: "Valor Total",
      selector: row => row.valortotal
    }
  ]

  // Columnas de la tabla de productos
  const columnsProductos = [
    {
      name: "ID Producto",
      selector: row => row.idproducto
    },
    {
      name: "Cantidad",
      selector: row => row.cantidad
    },
    {
      name: "Valor Total",
      selector: row => row.valortotal
    }
  ]

  return (
    <>
      <Tabs defaultActiveKey="Ventas a despachar" id="tab-ventas" className='mb-3' fill justify>
        <Tab eventKey='Ventas a despachar' title='Ventas a despachar'>
        <div>
          <h1 className='tituloAdmin'>
            Administrar Ventas a despachar
          </h1>
        </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={data => setSelectedRow(data.selectedRows[0])}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta a despachar</p>

          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
          </Row>
        </Tab>

        <Tab eventKey='Ventas despachadas' title='Ventas despachadas'>
        <div>
          <h1 className='tituloAdmin'>
            Administrar ventas despachadas
          </h1>
        </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={data => setSelectedRow(data.selectedRows[0])}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta a despachar</p>

          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
          </Row>
        </Tab>

        <Tab eventKey='Ventas finalizadas' title='Ventas finalizadas'>
        <div>
          <h1 className='tituloAdmin'>
            Ventas Finalizadas
          </h1>
        </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              onSelectedRowsChange={data => setSelectedRow(data.selectedRows[0])}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta a despachar</p>

          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
          </Row>
        </Tab>
      </Tabs>
    </>
  )
}
