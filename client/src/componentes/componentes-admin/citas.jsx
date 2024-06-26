import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Toaster, toast } from 'sonner';
import Cabecera from '../header';
import "./citas.css";

export default function Citas() {
  const [citasInfoRechazadas, setCitasInfoRechazadas] = useState([]);
  const [citasInfoSolicitud, setCitasInfoSolicitud] = useState([]);
  const [citasInfoAceptadas, setCitasInfoAceptadas] = useState([]);
  const [citasInfoFinalizadas, setCitasInfoFinalizadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, serviciosRes, tiposDomicilioRes, mascotasRes, barriosRes, estadosCitaRes, clientesRes] = await Promise.all([
          fetch('http://localhost:5000/citas').then(res => res.json()),
          fetch('http://localhost:5000/servicios').then(res => res.json()),
          fetch('http://localhost:5000/tiposdomicilios').then(res => res.json()),
          fetch('http://localhost:5000/mascotascitas').then(res => res.json()),
          fetch('http://localhost:5000/barriosaprovados').then(res => res.json()),
          fetch('http://localhost:5000/estadocita').then(res => res.json()),
          fetch('http://localhost:5000/clientes').then(res => res.json())
        ]);

        const citas = citasRes.map(cita => ({
          ...cita,
          servicio: serviciosRes.find(servicio => servicio.idservicio === cita.idservicio)?.servicio || "N/A",
          tipoDomicilio: tiposDomicilioRes.find(tipo => tipo.idtipodomicilio === cita.idtipodomicilio)?.tipodomicilio || "N/A",
          mascota: mascotasRes.find(mascota => mascota.idmascota === cita.idmascota)?.nombremascota || "N/A",
          raza: mascotasRes.find(mascota => mascota.idmascota === cita.idmascota)?.raza || "N/A",
          barrio: barriosRes.find(barrio => barrio.idbarrioaprovado === cita.idbarrioaprovado)?.barrioaprovado || "N/A",
          estado: estadosCitaRes.find(estado => estado.idestadocita === cita.idestadocita)?.estadocita || "N/A",
          cliente: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.nombres || "N/A",
          nuip: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.nuipcliente || "N/A",
          correo: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.correo || "N/A",
          telefono: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.telefono || "N/A"
        }));

        const rechazadas = citas.filter(cita => cita.idestadocita === 1);
        const solicitudes = citas.filter(cita => cita.idestadocita === 2);
        const aceptadas = citas.filter(cita => cita.idestadocita === 3);
        const finalizadas = citas.filter(cita => cita.idestadocita === 4);

        setCitasInfoRechazadas(rechazadas);
        setCitasInfoSolicitud(solicitudes);
        setCitasInfoAceptadas(aceptadas);
        setCitasInfoFinalizadas(finalizadas);
        setCargando(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const actualizarEstado = () => {
    const cita = selectedRow[0];
    fetch(`http://localhost:5000/citas/${cita.idcitas}`, {
      method: "PUT",
      body: JSON.stringify(cita),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  const aceptarUnaCita = () => {
    const cita = selectedRow[0];
    fetch(`http://localhost:5000/citas/aceptar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Actualiza el estado de la aplicación o realiza cualquier acción adicional necesaria
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const rechazarUnaCita = () => {
    const cita = selectedRow[0];
    fetch(`http://localhost:5000/citas/rechazar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Actualiza el estado de la aplicación o realiza cualquier acción adicional necesaria
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };
  const finalizarUnaCita = () => {
    const cita = selectedRow[0];
    fetch(`http://localhost:5000/citas/finalizar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Actualiza el estado de la aplicación o realiza cualquier acción adicional necesaria
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };



  const columns = [
    { name: "Codigo cita", selector: row => row.idcitas },
    { name: "Dueño paciente", selector: row => row.cliente },
    { name: "Raza paciente", selector: row => row.raza },
    { name: "Fecha solicitud", selector: row => row.fechacita },
    { name: "Estado", selector: row => row.estado, sortable: true }
  ];

  const conditionalRowsStyles = [
    {
      when: row => row.estado === "Aceptada",
      style: { backgroundColor: 'rgb(131, 230, 152)' },
    },
    {
      when: row => row.estado === "Rechazada",
      style: { backgroundColor: 'rgba(255, 106, 89, 1)' },
    }
  ];

  const handleChange = (state) => {
    setSelectedRow(state.selectedRows);
  };

  const aceptarCita = () => {
    const seleccion = selectedRow[0];
    if (seleccion) {
      seleccion.estado = "Aceptada";
      setSelectedRow([seleccion]);
      toast.success('Cita aceptada');
    }
  };

  const rechazarCita = () => {
    const seleccion = selectedRow[0];
    if (seleccion) {
      seleccion.estado = "Rechazada";
      setSelectedRow([seleccion]);
      toast.error('Cita rechazada');
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="Solicitudes" id="tab-ventas" className='mb-3' fill justify>
        <Tab eventKey='Solicitudes' title='Solicitudes citas'>
          <div>
            <h1 className='tituloAdmin'>
              Administrar Solicitudes Citas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoSolicitud}
              fixedHeader
              selectableRows
              selectableRowsSingle
              conditionalRowStyles={conditionalRowsStyles}
              onSelectedRowsChange={handleChange}
              pagination
              progressPending={cargando}
              responsive
            />
          </div>

          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].tipoDomicilio : ""} disabled />
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
                  <FormControl value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
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
                  <FormLabel>Nombre Mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
              <Toaster richColors expand={false} position='top-right' />
              <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
                <Button variant='outline-success' onClick={() => { aceptarUnaCita() }}>Aceptar Solicitud</Button>
                <Button variant='outline-danger' onClick={() => { rechazarUnaCita() }}>Rechazar Solicitud</Button>
              </div>
            </Form>
          </div>
        </Tab>
        <Tab eventKey='Citas aceptadas' title='Citas Aceptadas'>
          <div>
            <h1 className='tituloAdmin'>
              Citas Aceptadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoAceptadas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              conditionalRowStyles={conditionalRowsStyles}
              onSelectedRowsChange={handleChange}
              pagination
              progressPending={cargando}
              responsive
            />
          </div>
          
          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].tipoDomicilio : ""} disabled />
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
                  <FormControl value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
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
                  <FormLabel>Nombre Mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
              <Toaster richColors expand={false} position='top-right' />
              <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
                <Button variant='outline-success' onClick={() => { finalizarUnaCita () }}>Finalizar Cita</Button>
              </div>
            </Form>
          </div>
        </Tab>
        <Tab eventKey='Citas finalizadas' title='Citas Finalizadas'>
          <div>
            <h1 className='tituloAdmin'>
              Citas Finalizadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoFinalizadas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              conditionalRowStyles={conditionalRowsStyles}
              onSelectedRowsChange={handleChange}
              pagination
              progressPending={cargando}
              responsive
            />
          </div>
          
          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].tipoDomicilio : ""} disabled />
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
                  <FormControl value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
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
                  <FormLabel>Nombre Mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
              <Toaster richColors expand={false} position='top-right' />
            </Form>
          </div>
        </Tab>
        <Tab eventKey='Citas rechazadas' title='Citas Rechazadas'>
          <div>
            <h1 className='tituloAdmin'>
              Citas Rechazadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoRechazadas}
              fixedHeader
              selectableRows
              selectableRowsSingle
              conditionalRowStyles={conditionalRowsStyles}
              onSelectedRowsChange={handleChange}
              pagination
              progressPending={cargando}
              responsive
            />
          </div>
          
          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].tipoDomicilio : ""} disabled />
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
                  <FormControl value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
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
                  <FormLabel>Nombre Mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
              <Toaster richColors expand={false} position='top-right' />
            </Form>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
