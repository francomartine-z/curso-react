import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";
import  { myContext } from "../context/CartContext";
import { useContext } from "react";

function Category() {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

    const valueContext = useContext(myContext);

    useEffect(() => {
        const db = getFirestore(app);
        const productsCollection = collection(db, "products");

        getDocs(productsCollection)
            .then((response) => {
                const productsData = response.docs.map((doc) => doc.data());
                setProductsList(productsData);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error al consultar Firestore: ", error);
                setLoading(false);
            });
    }, []);

    function handleAddToCart(prodId){
        console.log("Agregar al carrito el producto con id: ", prodId);
        valueContext.setTotal(valueContext.total + 1); 
    }

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    const filteredProducts = productsList.filter(prod => prod.category === category);

    if (filteredProducts.length === 0) {
        return <p>No hay productos para la categoría: {category}</p>;
    }

    return (
        <section className="products">
            <h1 className="products__title">Mi tienda de ropa</h1>

            <div className="products__container">
                <h2 className="products__title">Lista de productos de la categoría</h2>
                <div className="container__cards">
                {filteredProducts.map(prod => (
                    <div key={prod.id} className="card">
                        <h3 className="card__title">{prod.title}</h3>
                        <img src={ prod.images} alt={prod.title} className="card__img" />
                        <p className="card__precio">{prod.price}</p>
                        <Link to={`/details/${prod.id}`} className="card__link">Ver Detalle</Link>
                        <button className="card__btn" onClick={() => handleAddToCart(prod.id)}>Agregar al carrito</button>
                    </div>   
                ))}</div> 
            </div>
        </section>
    );
}

export default Category;