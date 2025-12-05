import { Link } from "react-router-dom"

function Header(){
    return(
    <header className="header">
        <h3 className="header__title">Tienda de Ropa</h3>
        <nav className="header__nav">
            <Link to="/" className="nav__link">Inicio</Link>
            <Link to="/about/" className="nav__link">Nosotros</Link>
        </nav>
    </header>
    )
}
export default Header 