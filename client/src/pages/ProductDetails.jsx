import {
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getProductById,
} from "../api/productApi";

import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const { data } =
      await getProductById(id);

    setProduct(data.product);
  };

  if (!product)
    return <Loader />;

  return (
    <div className="row">

      <div className="col-md-6">

        <img
          src={
            product.images?.[0]?.url
          }
          className="img-fluid rounded"
        />

      </div>

      <div className="col-md-6">

        <h2>{product.name}</h2>

        <h3 className="text-success">
          ₹{product.price}
        </h3>

        <p>
          {product.description}
        </p>

        <button className="btn btn-dark">
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductDetails;