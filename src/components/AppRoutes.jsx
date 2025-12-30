import { Routes, Route , Navigate} from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Details from "../pages/Details"
import Category from "../pages/Category"
import CartPage from "../pages/CartPage"

function AppRoutes(){

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/cart" element={<CartPage />} />   
            <Route path="/category/:category" element={<Category />} />

            <Route path="/men" element={<Navigate to="/category/men" replace />} />
            <Route path="/women" element={<Navigate to="/category/women" replace />} />
            <Route path="/accessories" element={<Navigate to="/category/accessories" replace />} />
        </Routes>
        
    )
}

export default AppRoutes