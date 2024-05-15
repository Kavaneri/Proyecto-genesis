const express = require("express");
const app = express();
const cors = require("cors");
const pool = require ("./db");
const crypto = require('crypto'); 

//middleware
app.use(cors ());
app.use(express.json());

//ROUTES//
    //funciones barrios aprovados
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
    
    //funciones categorias
        //obtener tablas categorias
            app.get("/categorias", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM categorias");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

    //funciones citas
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
        //registrar una cita en la db
            app.post("/citas", async (req, res) => {
                try {
                    //obtener los datos del http
                    const { direccion, fechaCita, horaCita, comentarioCliente,comentarioMedico,idservicio,idtipodomicilio,idmascota,idbarrioaprovado,idestadocita,idcliente } = req.body;
            
                    // Realizar la inserción en la base de datos
                    const newCita = await pool.query(
                        "INSERT INTO citas (direccion,fechacita,horacita,comentariocliente,comentariomedico,idservicio,idtipodomicilio,idmascota, idbarrioaprovado,idestadocita,idcliente) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
                        [direccion,fechaCita,horaCita,comentarioCliente,comentarioMedico,idservicio,idtipodomicilio,idmascota, idbarrioaprovado,idestadocita,idcliente ]
                    );
            
                    res.json(newCita.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la cita en la base de datos.");
                }
            });
        //modificar una cita en la db
            app.patch("/citas",async(req,res)=>{
                try {
                    res.json("proximamente")
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la cita en la base de datos.");
                }
            })

    //tablas clientes
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
        //publicar clientes
            app.post("/clientes", async (req, res) => {
                try {
                    //obtener los datos del http
                    const { nuipcliente, correo, telefono, nombres, apellidos } = req.body;
            
                    // Realizar la inserción en la base de datos
                    const newCliente = await pool.query(
                        "INSERT INTO clientes (nuipcliente, correo, telefono, nombres, apellidos) VALUES ($1, $2, $3, $4,$5) RETURNING *",
                        [nuipcliente, correo, telefono, nombres, apellidos]
                    );
            
                    res.json(newCliente.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar el cliente en la base de datos.");
                }
            });
    //tablas detalle ventas
        //obtener detalles ventas

        //obtener un detalle venta

        //publicar un detalle venta

        //modificar un detalle venta

    //tabla dias disponibles
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
    //tabla especies
        //obtener especies
            app.get("/especies", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM especies");
                    res.json(allTodos.rows)
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla estados citas
        //obtener estados citas
            app.get("/estadoCita", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM estadoCita");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tablas estados venta
        //obtener estados de ventas
            app.get("/estadosVentas", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM estadosVentas");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla lotes producto intrahospitalario
        //obtener lotes intrahospitalario
            app.get("/lotesProductos",async (req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM lotesProductos");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.log(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //publicar un lote de producto intrahospitalario
            app.post("/lotesProductos", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { cantlote, compralote, vecimientolote, idproductointrahospitalario } = req.body;
                    
                    // Verificar si los datos son válidos
                    
                    //volver el http a query sql
                    const newLoteProducto = await pool.query(
                        "INSERT INTO lotesProductos (cantLote, compraLote, vecimientoLote, idProductoIntrahospitalario) VALUES ($1, $2, $3, $4) RETURNING *",
                        [cantlote, compralote, vecimientolote, idproductointrahospitalario]
                    );
                    
                    res.json(newLoteProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });
        //borrar un lote de producto intrahospitalario
            app.delete("/lotesProductos/:id",async (req,res) => {
                try {
                    const {id} = req.params;
                    const allTodos = await pool.query("DELETE FROM lotesProductos WHERE idLoteProducto = $1",[id]);
                    res.json("producto borrado");
                } catch (error) {
                    console.log(error.message);
                    res.status(500).send("Error al borrar en la base de datos.");
                }
            });
    //tabla de mascotas de las citas
        //obtener mascotas de las citas
            app.get("/mascotas", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM mascotas");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar mascotas de las citas
            app.post("/mascotas", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombremascota, raza } = req.body;
            
                    // Realizar la inserción en la base de datos
                    const newMascota = await pool.query(
                        "INSERT INTO mascotas (nombreMascota, raza) VALUES ($1, $2) RETURNING *",
                        [nombremascota, raza]
                    );
            
                    res.json(newMascota.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la mascota en la base de datos.");
                }
            });
    //tabla mascotas de usuarios
        //obtener mascotas de usuarios
            app.get("/mascotasusuario", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM mascotasusuario");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar mascotas de usuario
            app.post("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        
        //borrar mascota de usuario
            app.delete("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //modificar mascota de usario
            app.patch("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla productos tienda
        //obtener producto tienda
            app.get("/productos", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //obtener productos segun categorias
            //comida
            app.get("/productos/comida", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 1 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //hogar
            app.get("/productos/hogar", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 2 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //juguetes
            app.get("/productos/juguetes", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 3 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //salud
            app.get("/productos/salud", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 4 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //viaje
            app.get("/productos/viaje", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 5 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //paseo
            app.get("/productos/comida", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 6 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //comida
            app.get("/productos/comida", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 1 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            
            
        //publicar producto tienda
            app.delete("/productos", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });


        //modificar producto tienda
            app.patch("/productos", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

    //tabla productos intrahospitalarios
        //obtener producto intrahospitalarios
            app.get("/productosIntrahospitalarios", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //publicar producto intrahospitalarios
            app.post("/productosIntrahospitalarios", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombreproductointrahospitalario, preciocompra, descripccion, inventarioactual, mininventariorecomendado, idproveedor, idtipoproducto } = req.body;
                    
                    // Verificar si los datos son válidos
                    
                    //volver el http a query sql
                    const newProducto = await pool.query(
                        "INSERT INTO productosIntrahospitalarios (nombreProductoIntrahospitalario, precioCompra, descripccion, inventarioActual, minInventarioRecomendado, idProveedor, idTipoProducto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                        [nombreproductointrahospitalario, preciocompra, descripccion, inventarioactual, mininventariorecomendado, idproveedor, idtipoproducto]
                    );

                    res.json(newProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });
        //modificar producto intrahospitalarios
            app.patch("/productosIntrahospitalarios", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla proovedores
        //obtener proovedores
            app.get("/proveedores", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM proveedores");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar un proovedor
            app.post("/proveedores", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombreproveedor, telefonoproveedor, correo, direccion } = req.body;

                    // Verificar si los datos son válidos
                    
                    //volver el http a query sql
                    const newProveedor = await pool.query(
                        "INSERT INTO proveedores (nombreProveedor, telefonoProveedor, correo, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
                        [nombreproveedor, telefonoproveedor, correo, direccion]
                    );

                    res.json(newProveedor.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });

        //modificar un proovedor
            app.patch("/proveedores", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla roles
        //obtener roles
            app.get("/roles", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM roles");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla salida productos intrahospitalarios
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
        //agregar salida de productos intrahospitalarios
            app.post("/salidasProductos", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { fechasalida, cantidad, idproductointrahospitalario } = req.body;

                    //volver el http a query sql
                    const newSalidaProducto = await pool.query(
                        "INSERT INTO salidasProductos (fechaSalida, cantidad, idProductoIntrahospitalario) VALUES ($1, $2, $3) RETURNING *",
                        [fechasalida, cantidad, idproductointrahospitalario]
                    );
                    
                    res.json(newSalidaProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });
    //tabla de servicios:
    
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

    //tabla de ventas
        //obtener ventas
            app.get("/ventas", async(req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM ventas");
                    res.json(allTodos.rows);
                } catch (error) {
                    
                }
            });
        //publicar una venta
        
        //registrar una venta
            app.post("/ventas", async (req, res) => {
                try {
                    const { fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente } = req.body;
            
                    // Verificar si los datos son válidos
                    if (!fechaventa || !valortotal || !direccion || !idbarriosaprovado || !idestadoventa || !idcliente) {
                        return res.status(400).json({ message: "La fecha de venta, total, dirección, cliente, barrio aprobado y estado de venta son campos obligatorios." });
                    }
            
                    // Realizar la inserción en la base de datos
                    const newVenta = await pool.query(
                        "INSERT INTO ventas (fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                        [fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente]
                    );
            
                    res.json(newVenta.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la venta en la base de datos.");
                }
            });

            

        
        
            

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
        //registrar un servicio
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
    //tablas de ventas
        //obtener estadoVenta
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
        //obtener detalleVenta
        //app.get("/detalleVenta", async(req,res) => {
        //    try {
        //        const allTodos = await pool.query("SELECT * FROM detalleVenta");
        //        res.json( allTodos.rows);
        //    } catch (error) {
        //        console.error(error.message);
        //        res.status(500).send("Error al obtener en la base de datos.");
        //    }
        //});

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
    //tablas roles
        //obtener roles
        app.post("/roles",async(req,res)=>{
            try {
                const { descripccion } = req.body;
                const newRol = await pool.query(
                    "INSERT INTO roles (descripccion) VALUES ($1) RETURNING *",
                    [descripccion]
                );
                res.json(newRol.rows[0]);

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar roles
        app.get("/roles",async(req,res)=>{
            try {
                const allTodos = await pool.query("SELECT * FROM roles");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
    
    //tablas de usuarios
        //obtener usuarios
        app.get("/usuarios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM usuarios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });

        //publicar usuarios
        app.post("/usuarios", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { nuipCliente, clave, correo, telefono, nombre, apellido,idroll } = req.body;
        
                // Verificar si el NUIP es válido (debe ser un número de 9 a 11 dígitos)
                if (!/^[\d]{9,11}$/.test(nuipCliente)) {
                    return res.status(400).json({ message: "El NUIP no es válido. Debe ser un número de 9 a 11 dígitos." });
                }
        
                // Verificar si el número de teléfono es válido (debe ser un número de 10 dígitos)
                if (!/^\d{10}$/.test(telefono)) {
                    return res.status(400).json({ message: "El número de teléfono no es válido. Debe ser un número de 10 dígitos." });
                }
        
                // Verificar si la contraseña tiene al menos 8 caracteres
                if (clave.length < 8) {
                    return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
                }
        
                // Calcular el hash SHA-256 de la contraseña
                const hash = crypto.createHash('sha256').update(clave).digest('hex');
        
                // Insertar los datos en la base de datos
                const newProveedor = await pool.query(
                    "INSERT INTO usuarios (nuipCliente, clave_hash, correo, telefono, nombre, apellido, idroll) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                    [nuipCliente, hash, correo, telefono, nombre, apellido,idroll]
                );
        
                res.json(newProveedor.rows[0]); // Responder con los datos insertados
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        
        //inicio seccion de un usuario
        app.get("/autenticar", async (req, res) => {
            try {
                // Obtener los datos de la consulta
                const { correo, clave } = req.body;
        
                // Buscar el usuario en la base de datos por correo electrónico
                const usuario = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = $1",
                    [correo]
                );
        
                // Verificar si se encontró un usuario con ese correo
                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "El correo electrónico no está registrado." });
                }
        
                // Verificar si la contraseña coincide
                const hash = crypto.createHash('sha256').update(clave).digest('hex');
                if (usuario.rows[0].clave_hash !== hash) {
                    return res.status(401).json({ message: "La contraseña es incorrecta." });
                }
        
                // Si la autenticación es exitosa, devolver los datos del usuario
                res.json(usuario.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });
        
        //cambiar contraseña de un usuario
        app.patch("/usuarios/cambiar-clave", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { correo, nuevaClave } = req.body;
                //const { correo, claveActual, nuevaClave } = req.body;
        
                // Buscar el usuario en la base de datos por correo electrónico
                const usuario = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = $1",
                    [correo]
                );
        
                // Verificar si se encontró un usuario con ese correo
                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "El correo electrónico no está registrado." });
                }
        
                // Verificar si la clave actual coincide
                //const hashClaveActual = crypto.createHash('sha256').update(claveActual).digest('hex');
                //if (usuario.rows[0].clave_hash !== hashClaveActual) {
                //    return res.status(401).json({ message: "La clave actual es incorrecta." });
                //}
        
                // Calcular el hash SHA-256 de la nueva clave
                const hashNuevaClave = crypto.createHash('sha256').update(nuevaClave).digest('hex');
        
                // Actualizar la clave del usuario en la base de datos
                await pool.query(
                    "UPDATE usuarios SET clave_hash = $1 WHERE correo = $2",
                    [hashNuevaClave, correo]
                );
        
                res.json({ message: "La clave ha sido cambiada exitosamente." });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });
        
        //cambiar telefono de un usuario
        app.patch("/usuarios/cambiar-telefono", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { correo, nuevaTelefono } = req.body;
        
                // Actualizar el teléfono del usuario en la base de datos
                await pool.query(
                    "UPDATE usuarios SET telefono = $1 WHERE correo = $2",
                    [nuevaTelefono, correo]
                );
        
                res.json({ message: "El teléfono ha sido cambiado exitosamente." });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        
        //agregar a la db dias disponibles
        app.post("/diasDisponibles", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { diasdisponibles } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newDiaDisponible = await pool.query(
                    "INSERT INTO diasDisponibles (diasdisponibles) VALUES ($1) RETURNING *",
                    [diasdisponibles]
                );
                
                res.json(newDiaDisponible.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
    });
        
        
        //obtener un usuario

        //guardar usuarios

        //borrar usuarios

app. listen(5000, () =>{
    console.log("server has started on port 5000");
});