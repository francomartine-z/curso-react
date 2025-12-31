import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"


function Header(){
    return(
    <header className="header">
        <h3 className="header__title">Tienda de Ropa</h3>
        <nav className="header__nav">
            <Link to="/" className="nav__link">Inicio</Link>
            <Link to="/category/men" className="nav__link">Hombres</Link>
            <Link to="/category/women" className="nav__link">Mujeres</Link>
            <Link to="/category/accessories" className="nav__link">Accesorios</Link> 
            <Link to="/about/" className="nav__link">Nosotros</Link>
            <Link to="/cart" className="nav__link">
                <CartWidget />
            </Link>
             
        </nav>
    </header>
    )
}
export default Header 