import { createContext, useState, useEffect } from "react";

export const myContext = createContext();

const Provider = myContext.Provider;

function CartContext({ children }) {
    const [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }); //inicializa el carrito desde el localStorage si existe

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); //actualiza el localStorage cada vez que el carrito cambia

    function addToCart(item) { //funcion para agregar productos al carrito
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => 
                cartItem.id === item.id
            );  //verifica si el item ya existe en el carrito antes de cambiar el estado
            
            if (existingItem) {  // si el item ya existe, actualiza la cantidad
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { 
                            ...cartItem,
                             quantity: cartItem.quantity + 1
                            }
                        : cartItem
                );
            }
            return [...prevCart, {...item, quantity: 1}]; // si el item no existe, lo agrega al carrito
        });
    }

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0); //calcula el total de items en el carrito

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); //calcula el precio total de los items en el carrito

    return (
    <Provider value={{ cart, addToCart, totalItems, totalPrice }}>
        {children}
    </Provider>
    )
}

export default CartContext;