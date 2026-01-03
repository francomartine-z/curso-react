import { Link } from "react-router-dom";
import { useEffect , useState } from "react";
import { useContext } from "react";
import { myContext } from "../context/CartContext";
import { getFirestore, collection , getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";

function Products(){
    const [products, setProducts] = useState([]);
    const valueContext = useContext(myContext);

    useEffect(() => {
        const db = getFirestore(app);
        
        const productsCollection = collection(db, "products");

        const consult = getDocs(productsCollection);

        consult
            .then((response) => {
                const productsData = response.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                console.log("Productos obtenidos de Firestore: ", productsData);
                setProducts(productsData)
            })
            .catch((error) => {
                console.log("Error al consultar Firestore: ", error);
            })
        
    }, []);

    function handleAddToCart(product){
        valueContext.addToCart(product);
    }
    
return(
    <section className="products">
        <h1 className="products__title">Mi tienda de ropa</h1>
        <div className="products__container">
            <h2 className="container__title">Lista de productos</h2>
            <div className="container__cards">
            {products.map(prod =>(
                <div key={prod.id} className="card">
                    <h3 className="card__title">{prod.title}</h3>
                    <img src={prod.images} alt={prod.title} className="card__img" />
                    <p className="card__precio">$ {prod.price}</p>
                    <Link to={`/details/${prod.id}`} className="card__link">Ver Detalle</Link>
                    <button className="card__btn" onClick={() => handleAddToCart(prod)}>Agregar al carrito</button>
                </div>
            ))}
            </div>
        </div>
    </section>
)
}



export default Products