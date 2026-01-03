import { useContext, useState } from "react";
import { myContext } from "../context/CartContext";
import { addDoc, getFirestore ,collection } from "firebase/firestore";
import {app} from "../firebaseConfig";

function CartPage() {
    const {cart, totalItems, totalPrice} = useContext(myContext);
    const [buyer, setBuyer] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: ""
    });

    function handleBuy(e){
        e.preventDefault();

        if(cart.length === 0){
            alert("El carrito esta vacio.")
            return;
    }

    const db = getFirestore(app);

    const order = {
        buyer,
        items: cart,
        total: totalPrice,
        date: new Date()
    };

    addDoc(collection(db, "orders"), order)
    .then((docRef) => {
        alert("Compra realizada con exito. Su ID de orden es: " + docRef.id);
    })
    .catch((error) => {
        console.error("Error al crear la orden: ", error);
    });
  }
  return (
    <section className="cartPage">
      <h1 className="cartPage__title">Tu Carrito</h1>
      
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
        <div className="cartPage__items">
            {cart.map((item) => (
                <div key={item.id} className="cartPage__item">
                    <h4>{item.title}</h4>
                    <p>Precio: ${item.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Subtotal: ${item.price * item.quantity}</p>
                </div>
            ))}
        </div>

        <h3>Total de productos: {totalItems}</h3>
        <h3>Total a pagar: ${totalPrice}</h3>

        <form className="cartPage__form" onSubmit={handleBuy}>
            <h2>Información del Comprador</h2>

            <input 
                type="text" 
                placeholder="Nombre"
                value={buyer.name}
                onChange={(e) => setBuyer({...buyer, name: e.target.value})}
            />
            <input 
                type="text" 
                placeholder="Apellido"
                value={buyer.lastName}
                onChange={(e) => setBuyer({...buyer, lastName: e.target.value})}
            />
            <input 
                type="text" 
                placeholder="Teléfono"
                value={buyer.phone}
                onChange={(e) => setBuyer({...buyer, phone: e.target.value})}
            />
            <input 
                type="email" 
                placeholder="Email"
                value={buyer.email}
                onChange={(e) => setBuyer({...buyer, email: e.target.value})}
            />
            <input 
                type="text" 
                placeholder="Dirección"
                value={buyer.address}
                onChange={(e) => setBuyer({...buyer, address: e.target.value})}
            />

            <button type="submit">Finalizar Compra</button>
        </form>
        </>
      )}
    </section>
  );
}

export default CartPage;