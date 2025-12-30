import { app } from "../firebaseConfig";
import { getFirestore, collection , addDoc } from "firebase/firestore";

function CartPage() {

    function handleBuy(e){
        e.preventDefault();
        alert("¡Gracias por tu compra!");

        const db = getFirestore(app);

        const productsCollection = collection(db, "products");
        
        const consult = addDoc(productsCollection, {
            name: "Producto de prueba",
            price: 1000,
            description: "Descripción de prueba"
        });

        console.log("Consulta realizada: ", consult);
    }

    return (
        <section className="cartPage">
            <h1>Tu Carrito</h1>
            <p>Aquí se mostrarán los productos agregados al carrito.</p>

            <form className="cartPage__form">
                <h2>Información de Envío</h2>
                <label>Nombre:</label>
                <input type="text" name="name" placeholder="pablo" required />
                <label>Apellido:</label>
                <input type="text" name="surname" placeholder="gonzalez" required />
                <label>Dirección:</label>
                <input type="text" name="address" placeholder="Calle Falsa 123" required />
            </form>

            <button className="cartPage__btn" onClick={handleBuy}>Finalizar Compra</button>
        </section>
    );
} 
export default CartPage;