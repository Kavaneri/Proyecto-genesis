import React, { createContext, useState, useEffect } from 'react';

// Creación del contexto
export const ShopContext = createContext(null);

// Función para mapear idcategoria a type
function mapCategoryToType(idcategoria) {
    switch (idcategoria) {
        case 1:
            return 'Comida';
        case 2:
            return 'Hogar';
        case 3:
            return 'Juguetes';
        case 4:
            return 'Salud';
        case 5:
            return 'Viaje';
        case 6:
            return 'Paseo';
        default:
            return 'Otros';
    }
}

// Función para mapear idespecie a category
function mapSpeciesToCategory(idespecie) {
    switch (idespecie) {
        case 1:
            return 'Gato';
        case 2:
            return 'Perro';
        default:
            return 'Otros';
    }
}

// Proveedor del contexto
export const ShopContextProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [detalleCompra, setDetalleCompra] = useState({});

    // Función para obtener los productos desde la API
    const fetchProductos = async () => {
        try {
            const url = `http://localhost:5000/productos`;
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();

            // Mapeo de los datos obtenidos a la estructura esperada por el componente
            const mappedData = data.map(item => ({
                id: item.idproducto,
                productName: item.producto,
                precio: item.precioventa,
                productImage: item.foto || 'default_image_url.jpg', // URL de imagen por defecto si es null
                category: mapSpeciesToCategory(item.idespecie), // Función para mapear idespecie a category
                type: mapCategoryToType(item.idcategoria) // Función para mapear idcategoria a type
            }));

            // Actualiza el estado con los datos mapeados
            setProductos(mappedData);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchProductos(); // Llama a fetchProductos cuando el componente se monta
    }, []);

    const preFiltrar = (products, type) => {
        return products.filter(product => product.type === type);
    };

    const [filtro, setFiltro] = useState({ category: "all" });

    const filtrarProductos = (products, type) => {
        return products.filter(product => 
            filtro.category === "all" || product.category === filtro.category || product.type === type
        );
    };

    const handleCategory = (event) => {
        setFiltro(prevState => ({
            ...prevState, category: event.target.value
        }));
    };

    // Aquí recibimos desde categoria y se envía a detalle compra
    
    const agregarProducto = (productoId) => {
        setDetalleCompra((prev) => {
            console.log('Adding product:', productoId);
            const nuevoDetalle = { ...prev };
            if (!nuevoDetalle[productoId]) {
                nuevoDetalle[productoId] = { cantidad: 0, total: 0 };
            }
            nuevoDetalle[productoId].cantidad += 1;
            nuevoDetalle[productoId].total = nuevoDetalle[productoId].cantidad * productos.find(p => p.id === productoId).precio;
            console.log('New detail:', nuevoDetalle);
            return nuevoDetalle;
        });
    };
    
    const removerProducto = (productoId) => {
        setDetalleCompra((prev) => {
            console.log('Removing product:', productoId);
            const nuevoDetalle = { ...prev };
            if (nuevoDetalle[productoId] && nuevoDetalle[productoId].cantidad > 0) {
                nuevoDetalle[productoId].cantidad -= 1;
                nuevoDetalle[productoId].total = nuevoDetalle[productoId].cantidad * productos.find(p => p.id === productoId).precio;
                if (nuevoDetalle[productoId].cantidad === 0) {
                    delete nuevoDetalle[productoId];
                }
            }
            console.log('New detail:', nuevoDetalle);
            return nuevoDetalle;
        });
    };
    

    const getCantidadProductos = () => {
        return Object.values(detalleCompra).reduce((acc, item) => acc + item.cantidad, 0);
    };

    const getSubtotalProductos = () => {
        return Object.values(detalleCompra).reduce((acc, item) => acc + item.total, 0);
    };

    const contextValue = {
        productos,
        detalleCompra,
        agregarProducto,
        removerProducto,
        getSubtotalProductos,
        getCantidadProductos,
        filtrarProductos,
        handleCategory,
        preFiltrar
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};
