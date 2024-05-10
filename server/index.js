const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db");

//middleware
app.use(cors ());
app.use(express.json());

//ROUTES//

//post/create a testVet
    //tablas de productos
        //agregar a la db un tipo producto
        app.post("/tipoProductos", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const {nombreTipoProducto} = req.body;

                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTodo = await pool.query(
                    "INSERT INTO tipoProductos (nombreTipoProducto) VALUES ($1) RETURNING *",
                    [nombreTipoProducto]
                );

                res.json(newTodo.rows[0])
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la db un proovedor
        app.post("/proveedores", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { nombreProveedor, telefonoProveedor, correo, direccion } = req.body;

                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newProveedor = await pool.query(
                    "INSERT INTO proveedores (nombreProveedor, telefonoProveedor, correo, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
                    [nombreProveedor, telefonoProveedor, correo, direccion]
                );

                res.json(newProveedor.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la db un producto intrahospitalario
        app.post("/productosIntrahospitalarios", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { nombreProductoIntrahospitalario, precioCompra, descripccion, inventarioActual, minInventarioRecomendado, idProveedor, idTipoProducto } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newProducto = await pool.query(
                    "INSERT INTO productosIntrahospitalarios (nombreProductoIntrahospitalario, precioCompra, descripccion, inventarioActual, minInventarioRecomendado, idProveedor, idTipoProducto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                    [nombreProductoIntrahospitalario, precioCompra, descripccion, inventarioActual, minInventarioRecomendado, idProveedor, idTipoProducto]
                );

                res.json(newProducto.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la bd entrada lote a un producto
        app.post("/lotesProductos", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { cantLote, compraLote, vecimientoLote, idProductoIntrahospitalario } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newLoteProducto = await pool.query(
                    "INSERT INTO lotesProductos (cantLote, compraLote, vecimientoLote, idProductoIntrahospitalario) VALUES ($1, $2, $3, $4) RETURNING *",
                    [cantLote, compraLote, vecimientoLote, idProductoIntrahospitalario]
                );
                
                res.json(newLoteProducto.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la bd salida de un producto
        app.post("/salidasProductos", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { fechaSalida,
                     cantidad,
                      idProductoIntrahospitalario } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newSalidaProducto = await pool.query(
                    "INSERT INTO salidasProductos (fechaSalida, cantidad, idProductoIntrahospitalario) VALUES ($1, $2, $3) RETURNING *",
                    [fechaSalida, cantidad, idProductoIntrahospitalario]
                );
                
                res.json(newSalidaProducto.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
    
    //tablas de citas
        //agregar una especie a la bd
        app.post("/especies", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { especie } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newEspecie = await pool.query(
                    "INSERT INTO especies (especie) VALUES ($1) RETURNING *",
                    [especie]
                );
                
                res.json(newEspecie.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar tamano animal
        app.post("/tamanoAnimales", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tamano } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTamanoAnimal = await pool.query(
                    "INSERT INTO tamanoAnimales (tamano) VALUES ($1) RETURNING *",
                    [tamano]
                );
                
                res.json(newTamanoAnimal.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la db un tipo de servicio
        app.post("/tiposServicios", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tipoServicio } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTipoServicio = await pool.query(
                    "INSERT INTO tiposServicios (tipoServicio) VALUES ($1) RETURNING *",
                    [tipoServicio]
                );
                
                res.json(newTipoServicio.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la db dias disponibles
        app.post("/diasDisponibles", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { diasDisponibles } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newDiaDisponible = await pool.query(
                    "INSERT INTO diasDisponibles (diasDisponibles) VALUES ($1) RETURNING *",
                    [diasDisponibles]
                );
                
                res.json(newDiaDisponible.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la bd un tipo domicilio
        app.post("/tiposDomicilios", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tipoDomicilio } = req.body;
        
                // Verificar si los datos son válidos
                if (!tipoDomicilio || tipoDomicilio.trim() === "") {
                    return res.status(400).json({ message: "El tipo de domicilio no puede estar vacío." });
                }
        
                // Realizar la inserción en la base de datos
                const newTipoDomicilio = await pool.query(
                    "INSERT INTO tiposDomicilios (tipoDomicilio) VALUES ($1) RETURNING *",
                    [tipoDomicilio]
                );
        
                res.json(newTipoDomicilio.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el tipo de domicilio en la base de datos.");
            }
        }); 
        //agregar una mascota
        app.post("/mascotas", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { nombreMascota, raza } = req.body;
        
                // Verificar si los datos son válidos
                if (!nombreMascota || !raza || nombreMascota.trim() === "" || raza.trim() === "") {
                    return res.status(400).json({ message: "El nombre de la mascota y la raza son obligatorios." });
                }
        
                // Realizar la inserción en la base de datos
                const newMascota = await pool.query(
                    "INSERT INTO mascotas (nombreMascota, raza) VALUES ($1, $2) RETURNING *",
                    [nombreMascota, raza]
                );
        
                res.json(newMascota.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar la mascota en la base de datos.");
            }
        });
        //registrar un barrio aprovado
        app.post("/barriosAprovados", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { barrioAprovado } = req.body;
        
                // Verificar valores válidos
                if (!barrioAprovado || barrioAprovado.trim() === "") {
                    return res.status(400).json({ message: "El nombre del barrio aprobado es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newBarrioAprovado = await pool.query(
                    "INSERT INTO barriosAprovados (barrioAprovado) VALUES ($1) RETURNING *",
                    [barrioAprovado]
                );
        
                res.json(newBarrioAprovado.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el barrio aprobado en la base de datos.");
            }
        });
        //agregar un estado de cita    
        app.post("/estadoCita", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { estadoCita } = req.body;
        
                // Verificar si los datos son válidos
                if (!estadoCita || estadoCita.trim() === "") {
                    return res.status(400).json({ message: "El estado de la cita es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newEstadoCita = await pool.query(
                    "INSERT INTO estadoCita (estadoCita) VALUES ($1) RETURNING *",
                    [estadoCita]
                );
        
                res.json(newEstadoCita.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el estado de la cita en la base de datos.");
            }
        });
        //registrar un cliente
        app.post("/clientes", async (req, res) => {
            try {
                //obtener los datos del http
                const { correo, telefono, nombre, apellido } = req.body;
        
                // Verificar si los datos son válidos
                if (!correo || !telefono || !nombre || !apellido || correo.trim() === "" || nombre.trim() === "" || apellido.trim() === "") {
                    return res.status(400).json({ message: "Correo, teléfono, nombre y apellido son campos obligatorios." });
                }
        
                // Realizar la inserción en la base de datos
                const newCliente = await pool.query(
                    "INSERT INTO clientes (correo, telefono, nombre, apellido) VALUES ($1, $2, $3, $4) RETURNING *",
                    [correo, telefono, nombre, apellido]
                );
        
                res.json(newCliente.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el cliente en la base de datos.");
            }
        });
        //registrar un servicio
        app.post("/servicios", async (req, res) => {
            try {
                const { servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio } = req.body;
        
                // Verificar si los datos son válidos
                if (!servicio || !idEspecie || !idTamanoAnimal || !idDiasDisponibles || !idTipoServicio || servicio.trim() === "") {
                    return res.status(400).json({ message: "El servicio, idEspecie, idTamanoAnimal, idDiasDisponibles e idTipoServicio son campos obligatorios." });
                }
        
                // Verificar si las claves foráneas existen en las tablas relacionadas
                const especieExists = await pool.query("SELECT * FROM especies WHERE idEspecie = $1", [idEspecie]);
                if (especieExists.rows.length === 0) {
                    return res.status(404).json({ message: "La especie especificada no existe." });
                }
        
                const tamanoAnimalExists = await pool.query("SELECT * FROM tamanoAnimales WHERE idTamanoAnimal = $1", [idTamanoAnimal]);
                if (tamanoAnimalExists.rows.length === 0) {
                    return res.status(404).json({ message: "El tamaño del animal especificado no existe." });
                }
        
                const diasDisponiblesExists = await pool.query("SELECT * FROM diasDisponibles WHERE idDiasDisponibles = $1", [idDiasDisponibles]);
                if (diasDisponiblesExists.rows.length === 0) {
                    return res.status(404).json({ message: "Los días disponibles especificados no existen." });
                }
        
                const tipoServicioExists = await pool.query("SELECT * FROM tiposServicios WHERE idTipoServicio = $1", [idTipoServicio]);
                if (tipoServicioExists.rows.length === 0) {
                    return res.status(404).json({ message: "El tipo de servicio especificado no existe." });
                }
        
                // Realizar la inserción en la base de datos
                const newServicio = await pool.query(
                    "INSERT INTO servicios (servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                    [servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio]
                );
        
                res.json(newServicio.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el servicio en la base de datos.");
            }
        });
        //registrar una cita en la db
        app.post("/citas", async (req, res) => {
            try {
                const { direccion, fechaCita, horaCita, idServicio, nuipCliente, idTipoDomicilio, idMascota, idBarrioAprovado, idEstadoCita, comentarioCliente, comentarioMedico } = req.body;
        
                // Verificar si los datos son válidos
                if (!direccion || !fechaCita || !horaCita || !idServicio || !nuipCliente || !idTipoDomicilio || !idMascota || !idBarrioAprovado || !idEstadoCita || direccion.trim() === "") {
                    return res.status(400).json({ message: "La dirección, fecha, hora, servicio, cliente, tipo de domicilio, mascota, barrio aprobado y estado de la cita son campos obligatorios." });
                }
        
                // Verificar si las claves foráneas existen en las tablas relacionadas
                const servicioExists = await pool.query("SELECT * FROM servicios WHERE idServicio = $1", [idServicio]);
                if (servicioExists.rows.length === 0) {
                    return res.status(404).json({ message: "El servicio especificado no existe." });
                }
        
                const clienteExists = await pool.query("SELECT * FROM clientes WHERE nuipCliente = $1", [nuipCliente]);
                if (clienteExists.rows.length === 0) {
                    return res.status(404).json({ message: "El cliente especificado no existe." });
                }
        
                const tipoDomicilioExists = await pool.query("SELECT * FROM tiposDomicilios WHERE idTipoDomicilio = $1", [idTipoDomicilio]);
                if (tipoDomicilioExists.rows.length === 0) {
                    return res.status(404).json({ message: "El tipo de domicilio especificado no existe." });
                }
        
                const mascotaExists = await pool.query("SELECT * FROM mascotas WHERE idMascota = $1", [idMascota]);
                if (mascotaExists.rows.length === 0) {
                    return res.status(404).json({ message: "La mascota especificada no existe." });
                }
        
                const barrioAprovadoExists = await pool.query("SELECT * FROM barriosAprovados WHERE idBarrioAprovado = $1", [idBarrioAprovado]);
                if (barrioAprovadoExists.rows.length === 0) {
                    return res.status(404).json({ message: "El barrio aprobado especificado no existe." });
                }
        
                const estadoCitaExists = await pool.query("SELECT * FROM estadoCita WHERE idEstadoCita = $1", [idEstadoCita]);
                if (estadoCitaExists.rows.length === 0) {
                    return res.status(404).json({ message: "El estado de la cita especificado no existe." });
                }
        
                // Realizar la inserción en la base de datos
                const newCita = await pool.query(
                    "INSERT INTO citas (direccion, fechaCita, horaCita, idServicio, nuipCliente, idTipoDomicilio, idMascota, idBarrioAprovado, idEstadoCita, comentarioCliente, comentarioMedico) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
                    [direccion, fechaCita, horaCita, idServicio, nuipCliente, idTipoDomicilio, idMascota, idBarrioAprovado, idEstadoCita, comentarioCliente, comentarioMedico]
                );
        
                res.json(newCita.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar la cita en la base de datos.");
            }
        });

    //tablas de ventas
        //registrar estado venta
        app.post("/estadoVenta", async (req, res) => {
            try {
                const { estadoVenta } = req.body;
        
                // Verificar si los datos son válidos
                if (!estadoVenta || estadoVenta.trim() === "") {
                    return res.status(400).json({ message: "El estado de venta es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newEstadoVenta = await pool.query(
                    "INSERT INTO estadoVenta (estadoVenta) VALUES ($1) RETURNING *",
                    [estadoVenta]
                );
        
                res.json(newEstadoVenta.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el estado de venta en la base de datos.");
            }
        });
        //registrar un producto
        app.post("/productos", async (req, res) => {
            try {
                const { nombreProducto } = req.body;
        
                // Verificar si los datos son válidos
                if (!nombreProducto || nombreProducto.trim() === "") {
                    return res.status(400).json({ message: "El nombre del producto es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newProducto = await pool.query(
                    "INSERT INTO Productos (nombreProducto) VALUES ($1) RETURNING *",
                    [nombreProducto]
                );
        
                res.json(newProducto.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el producto en la base de datos.");
            }
        });
        //registrar una venta
        app.post("/ventas", async (req, res) => {
            try {
                const { fechaVenta, total, direccion, nuipCliente, idBarrioAprovado, idEstadoVenta } = req.body;
        
                // Verificar si los datos son válidos
                if (!fechaVenta || !total || !direccion || !nuipCliente || !idBarrioAprovado || !idEstadoVenta) {
                    return res.status(400).json({ message: "La fecha de venta, total, dirección, cliente, barrio aprobado y estado de venta son campos obligatorios." });
                }
        
                // Realizar la inserción en la base de datos
                const newVenta = await pool.query(
                    "INSERT INTO ventas (fechaVenta, total, direccion, nuipCliente, idBarrioAprovado, idEstadoVenta) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    [fechaVenta, total, direccion, nuipCliente, idBarrioAprovado, idEstadoVenta]
                );
        
                res.json(newVenta.rows[0]);
            } catch (err) {
                console.error(error.message);
                res.status(500).send("Error al insertar la venta en la base de datos.");
            }
        });
        //registrar detalle venta
        app.post("/detalleVenta", async (req, res) => {
            try {
                const { cantidadProducto, precioDetalle } = req.body;
        
                // Verificar si los datos son válidos
                if (!cantidadProducto || !precioDetalle) {
                    return res.status(400).json({ message: "La cantidad de producto y el precio del detalle son campos obligatorios." });
                }
        
                // Realizar la inserción en la base de datos
                const newDetalleVenta = await pool.query(
                    "INSERT INTO detalleVenta (cantidadProducto, precioDetalle) VALUES ($1, $2) RETURNING *",
                    [cantidadProducto, precioDetalle]
                );
        
                res.json(newDetalleVenta.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el detalle de venta en la base de datos.");
            }
        });

//get/select all todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.get("/tipoProductos", async (req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tipoProductos");
                res.json(allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los proovedores
        app.get("/proveedores", async (req,res) =>{
            try {
                const allTodos = await pool.query("SELECT * FROM proveedores");
                res.json(allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los productos intrahospitalarios
        app.get("/productosIntrahospitalarios", async (req,res) =>{
            try {
                const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios");
                res.json(allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener lotes productos intrahospitalarios
        app.get("/lotesProductos",async (req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM lotesProductos");
                res.json(allTodos.rows);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener salidas productos intrahospitalarios
        app.get("/salidasProductos", async(req,res) =>{
            try {
                const allTodos = await pool.query("SELECT * FROM salidasProductos");
                res.json(allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de citas  
        //obtener especies animales
        app.get("/especies", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM especies");
                res.json(allTodos.rows)
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tamaños
        app.get("/tamanoAnimales", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tamanoanimales");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposServicios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tiposServicios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener diasDisponibles
        app.get("/diasDisponibles", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM diasDisponibles");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposDomicilios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tiposDomicilios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener mascotas
        app.get("/mascotas", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM mascotas");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener barriosAprovados
        app.get("/barriosAprovados", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM barriosAprovados");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener estadoCita
        app.get("/estadoCita", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM estadoCita");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener clientes
        app.get("/clientes", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM clientes");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener servicios
        app.get("/servicios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM servicios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener citas
        app.get("/citas", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM citas");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        app.get("/estadoVenta", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM estadoVenta");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener productos
        app.get("/productos", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM productos");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener 
        app.get("/ventas", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM ventas");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener detalleVenta
        app.get("/detalleVenta", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM detalleVenta");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });



//get a todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.get("/tipoProductos/:id", async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tipoProductos WHERE idTipoProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los proovedores
        app.get("/proveedores/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM proveedores WHERE idProveedor = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los productos intrahospitalarios
        app.get("/productosIntrahospitalarios/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios WHERE idProductoIntrahospitalario = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener lotes productos intrahospitalarios
        app.get("/lotesProductos/:id",async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM lotesProductos WHERE idLoteProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener salidas productos intrahospitalarios
        app.get("/salidasProductos/:id", async(req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM salidasProductos WHERE idSalidaProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de citas  
        //obtener especies animales
        app.get("/especies/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM especies WHERE idEspecie = $1",[id]);
                res.json(allTodos.rows[0])
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tamaños
        app.get("/tamanoAnimales/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tamanoanimales WHERE idTamanoAnimal = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposServicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tiposServicios WHERE idTipoServicio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener diasDisponibles
        app.get("/diasDisponibles/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM diasDisponibles WHERE idDiasDisponibles = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposDomicilios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tiposDomicilios WHERE idTipoDomicilio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener mascotas
        app.get("/mascotas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM mascotas WHERE idMascota = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener barriosAprovados
        app.get("/barriosAprovados/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM barriosAprovados WHERE idBarrioAprovado = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener estadoCita
        app.get("/estadoCita/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM estadoCita WHERE idEstadoCita = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener clientes
        app.get("/clientes/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM clientes WHERE nuipCliente = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener servicios
        app.get("/servicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM servicios WHERE idServicio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener citas 3h35l
        app.get("/citas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM citas WHERE idCitas = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        app.get("/estadoVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM estadoVenta WHERE idEstadoVenta = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener productos
        app.get("/productos/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM productos WHERE idProducto = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener 
        app.get("/ventas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM ventas WHERE idDetalle = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener detalleVenta
        app.get("/detalleVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM detalleVenta WHERE idDetalleVenta = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });

//update a todo

//delete a todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.delete("/tipoProductos/:id", async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tipoProductos WHERE idTipoProducto = $1",[id]);
                res.json("element was delete");
                res.json( allTodos.rows[0]);

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener todos los proovedores
        app.delete("/proveedores/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM proveedores WHERE idProveedor = $1",[id]);
                res.json("element was delete");
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener todos los productos intrahospitalarios
        app.delete("/productosIntrahospitalarios/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM productosIntrahospitalarios WHERE idProductoIntrahospitalario = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener lotes productos intrahospitalarios
        app.delete("/lotesProductos/:id",async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM lotesProductos WHERE idLoteProducto = $1",[id]);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener salidas productos intrahospitalarios
        app.delete("/salidasProductos/:id", async(req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM salidasProductos WHERE idSalidaProducto = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
    //tablas de citas  
        //obtener especies animales
        app.delete("/especies/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM especies WHERE idEspecie = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tamaños
        app.delete("/tamanoAnimales/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tamanoanimales WHERE idTamanoAnimal = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.delete("/tiposServicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tiposServicios WHERE idTipoServicio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener diasDisponibles
        app.delete("/diasDisponibles/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM diasDisponibles WHERE idDiasDisponibles = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.delete("/tiposDomicilios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tiposDomicilios WHERE idTipoDomicilio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener mascotas
        app.delete("/mascotas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM mascotas WHERE idMascota = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener barriosAprovados
        app.delete("/barriosAprovados/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM barriosAprovados WHERE idBarrioAprovado = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener estadoCita
        app.delete("/estadoCita/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM estadoCita WHERE idEstadoCita = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener clientes
        app.delete("/clientes/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM clientes WHERE nuipCliente = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener servicios
        app.delete("/servicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM servicios WHERE idServicio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener citas 3h35l
        app.delete("/citas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM citas WHERE idCitas = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        app.delete("/estadoVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM estadoVenta WHERE idEstadoVenta = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener productos
        app.delete("/productos/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM productos WHERE idProducto = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener 
        app.delete("/ventas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM ventas WHERE idDetalle = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener detalleVenta
        app.delete("/detalleVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM detalleVenta WHERE idDetalleVenta = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });


app. listen(5000, () =>{
    console.log("server has started on port 5000");
});