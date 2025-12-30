import { createContext, useState } from "react";

export const myContext = createContext();

const Provider = myContext.Provider;


function CartContext(props) {
    const [total, setTotal] = useState(0)

    const contextValue = {
        numero: 1,
        nombre: "Franco",
        apellido: "Garcia",
        total: total,
        setTotal: setTotal,
    };

    return (
    <Provider value={contextValue}>
        {props.children}
    </Provider>
    )
}

export default CartContext;