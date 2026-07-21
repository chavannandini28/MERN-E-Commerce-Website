import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
} from "react-icons/fa";

import { getProducts } from "../api/productApi";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await getProducts();

      const productList = data.products || data || [];

      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(result);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Products...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row mb-5">

        <div className="col-lg-6 mx-auto">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Product..."
              value={keyword}
              onChange={searchHandler}
            />

          </div>

        </div>

      </div>

      <div className="row g-4">

        {filteredProducts.length === 0 ? (
          <div className="text-center">
            <h3>No Products Found</h3>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="col-lg-3 col-md-6"
              key={product._id}
            >
              <div className="card h-100 shadow border-0">

                <img
                  src={product.images?.[0] || product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>{product.name}</h5>

                  <p className="text-muted small">
                    {product.brand?.name || product.brand}
                  </p>

                  <h4 className="text-primary">
                    ₹{product.price}
                  </h4>

                </div>

                <div className="card-footer bg-white border-0 d-flex justify-content-between">

                  <Link
                    to={`/product/${product._id}`}
                    className="btn btn-outline-primary"
                  >
                    View
                  </Link>

                  <button className="btn btn-primary">
                    <FaShoppingCart />
                  </button>

                  <button className="btn btn-outline-danger">
                    <FaHeart />
                  </button>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Shop;