import { useContext } from "react";
import { myContext } from "../context/CartContext";

function CartWidget() {

    const valueContext = useContext(myContext);

    return (
        <span className="cart-widget">
            🛒
            <span>{valueContext.totalItems}</span>
        </span>
    );
};

export default CartWidget;