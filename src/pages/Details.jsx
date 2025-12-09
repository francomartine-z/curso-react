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
                <div className="detail__container">
                    <h1 className="detail__title">{product.title}</h1>
                    <img className="detail__image" src={product.img} alt={product.title} />
                    <p className="detail__precio">{product.precio}</p>
                    <p className="detail__texy">{product.detail}</p>
                </div>
            </section>
        </>
    )
}

export default Details