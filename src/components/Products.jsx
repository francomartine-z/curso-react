import products  from "../JS/products"
import { Link } from "react-router-dom";

function Products(){

return(
    <section className="products">
        <h1 className="products__title">Mi tienda de ropa</h1>
        <div className="products__container">
            <h2 className="container__title">Lista de productos</h2>
            <div className="container__cards">
            {products.map(prod =>(
                <div key={prod.id} className="card">
                    <h3 className="card__title">{prod.title}</h3>
                    <img src={prod.img} alt={prod.title} className="card__img" />
                    <p className="card__precio">{prod.precio}</p>
                    <Link to={`/details/${prod.id}`} className="card__link">Ver Detalle</Link>
                </div>
            ))}
            </div>
        </div>
    </section>
)
}
export default Products