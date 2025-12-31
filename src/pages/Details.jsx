import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { myContext } from "../context/CartContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";

function Details(){
    const [products, setProducts] = useState([]);
    const valueContext = useContext(myContext);

    useEffect(() => {
       const db = getFirestore(app);
        
        const productsCollection = collection(db, "products");

        const consult = getDocs(productsCollection);

         consult
            .then((response) => {
                const productsData = response.docs.map((doc) => {
                    return doc.data()
                });
                
                console.log("Productos obtenidos de Firestore: ", productsData);
                setProducts(productsData)
            })
            .catch((error) => {
                console.log("Error al consultar Firestore: ", error);
            })

    }, []);

    const {id} = useParams();
    const product = products.find((p)=> p.id === Number(id));

    function handleAddToCart(prodId){
        console.log("Agregar al carrito el producto con id: ", prodId);
        valueContext.setTotal(valueContext.total + 1); 
    }

    
    return(
        <>
            <section className="detail">
                {product && //si la condición es verdadera, muestra el detalle
                <div className="detail__container">
                    <h1 className="detail__title">{product.title}</h1>
                    <img className="detail__image" src={product.images} alt={product.title} />
                    <p className="detail__precio">$ {product.price}</p>
                    <p className="detail__texy">{product.description}</p>
                    <button className="detail__btn" onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
                </div>}
            </section>
        </>
    )
}

export default Details