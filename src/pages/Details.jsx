import { useParams } from "react-router-dom"
import products from "../JS/products";
import Header from "../components/Header"

function Details(){
    const {id} = useParams();
    const product = products.find((p)=> p.id === Number(id));

    if (!product) return <h2>Producto no encontrado</h2>;
    return(
        <>
            <Header />
            <section className="detail">
                <h1>{product.title}</h1>
                <img src={product.img} alt={product.title} />
                <p>{product.precio}</p>
                <p>{product.detail}</p>
            </section>
        </>
    )
}

export default Details