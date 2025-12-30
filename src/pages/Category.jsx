import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";

function Category() {
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();

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

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    const filteredProducts = productsList.filter(prod => prod.category === category);

    if (filteredProducts.length === 0) {
        return <p>No hay productos para la categoría: {category}</p>;
    }

    return (
        <section className="products">
            <h1 className="products__title">Categoría: {category}</h1>
            <div className="products__container">
                {filteredProducts.map(prod => (
                    <div key={prod.id} className="card">
                        <h3 className="card__title">{prod.title}</h3>
                        <img src={ prod.images} alt={prod.title} className="card__img" />
                        <p className="card__precio">{prod.price}</p>
                        <Link to={`/details/${prod.id}`} className="card__link">Ver Detalle</Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Category;