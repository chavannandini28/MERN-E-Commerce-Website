import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card shadow-sm h-100 border-0">

      <img
        src={product.images?.[0]?.url}
        className="card-img-top"
        style={{
          height: 230,
          objectFit: "cover",
        }}
      />

      <div className="card-body">

        <h5>{product.name}</h5>

        <h4 className="text-success">
          ₹{product.price}
        </h4>

        <Link
          to={`/product/${product._id}`}
          className="btn btn-dark w-100"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;