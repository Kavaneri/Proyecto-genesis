import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../productos';

export const ShopContext = createContext(null);

const getDetalleCompra = () =>{
    let detalle = {}
    for(let i = 1; i< PRODUCTS.length + 1 ; i++){
        detalle[i] = 0
    }
    return detalle
}

export const ShopContextProvider = ({children}) => {

    const[detalleCompra, setDetalleCompra] = useState(getDetalleCompra());

    const agregarProducto = (productoId) =>{
        setDetalleCompra((prev) => ({...prev , [productoId]: prev[productoId] + 1}))
    }

    const contextValue = {detalleCompra, agregarProducto}

    console.log(detalleCompra)

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )

};
