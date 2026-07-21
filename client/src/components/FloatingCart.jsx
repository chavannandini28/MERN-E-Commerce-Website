import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const FloatingCart = () => {
  const cart = useSelector((state) => state.cart);

  const count =
    cart?.cartItems?.length ||
    cart?.items?.length ||
    0;

  return (
    <Link
      to="/cart"
      className="floating-cart shadow-lg"
    >
      <FaShoppingCart size={24} />

      {count > 0 && (
        <span className="floating-badge">
          {count}
        </span>
      )}
    </Link>
  );
};

export default FloatingCart;