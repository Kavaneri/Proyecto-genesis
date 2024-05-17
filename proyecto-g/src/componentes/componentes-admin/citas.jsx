import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import data from "./MOCK_DATA.citas.json"
import { Col, Form, FormControl, FormGroup, FormLabel, InputGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import "./citas.css"

export default function Citas() {


  const columns = [
    {
      name: "Codigo cita",
      selector: row => row.codigo
    },
    {
      name: "Dueño paciente",
      selector: row => row.dueno_paciente
    },
    {
      name: "Raza paciente",
      selector: row => row.paciente
    },
    {
      name: "Fecha solicitud",
      selector: row => row.fecha_solicitud,

    },
    {
      name: "Estado",
      selector: row => row.estado,
      sortable: true
    },
  ]

  const conditionalRowsStyles = [
    {
      when: row => row.estado === "Aceptada",
      style: {
        backgroundColor: 'rgb(131, 230, 152)'
      },
    },
    {
      when: row => row.estado === "Rechazada",
      style: {
        backgroundColor: 'rgba(255, 106, 89, 1)'
      },
    },
  ]


  const [selectedRow, setSelectedRow] = useState([])
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [estadosCitas, setEstadosCitas] = useState([data])

  const handleChange = (state) => {
    setSelectedRow(state.selectedRows)
    console.log(selectedRow)
  }

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }

  const aceptarCita = () => {
    const seleccion = selectedRow[0]
    if (seleccion) {
      seleccion.estado = "Aceptada"
      setSelectedRow(seleccion)
      handleClearRows()
    }
  }


  return (
    <>
      <div className=''>
        <DataTable
          columns={columns}
          data={data}
          fixedHeader
          selectableRows
          conditionalRowStyles={conditionalRowsStyles}
          onSelectedRowsChange={handleChange}
        />
      </div>

      <div>
        <Form className='my-4'>
          <Row>{console.log(selectedRow)}

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Codigo Cita</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].codigo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Servicio</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
            </FormGroup>

          </Row>
          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].fecha_solicitud : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Hora</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].hora_solicitud : ""} disabled />
            </FormGroup>
          </Row>

          <FormGroup>
            <FormLabel className='mt-3'>Descripción</FormLabel>
            <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].descripcion : ""} disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
            <FormControl value={selectedRow[0] ? selectedRow[0].tipo_domicilio : ""} disabled />
          </FormGroup>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
            </FormGroup>

          </Row>

          <p className='mt-3 d-flex'>Datos de Dueño <hr className='separator' /></p>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].dueno_paciente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>NUIP</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].nuip : ""} disabled />
            </FormGroup>

          </Row>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].telefono : ""} disabled />
            </FormGroup>

          </Row>

          <p className='mt-3 d-flex'>Datos de Mascota <hr className='separator' /></p>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Nombre de Mascota</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].paciente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Raza de Mascota</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
            </FormGroup>

          </Row>

          <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
            <Button variant='outline-success' onClick={aceptarCita} >Aceptar Solicitud</Button>
            <Button variant='outline-danger' >Rechazar Solicitud</Button>
          </div>
        </Form>
      </div>

    </>
  )
}
