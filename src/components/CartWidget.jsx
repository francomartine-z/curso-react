import { useContext } from "react";
import { myContext } from "../context/CartContext";

function CartWidget() {

    const valueContext = useContext(myContext);

    return (
        <div>
            🛒
            <span>{valueContext.total}</span>
        </div>
    );
};

export default CartWidget;