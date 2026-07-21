import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";

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
      setLoading(true);

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
      <div className="container py-5">
        <SkeletonLoader count={8} />
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          Our Products
        </h1>

        <p className="text-muted">
          Discover premium products at the best prices.
        </p>

      </div>

      {/* Search */}

      <div className="row justify-content-center mb-5">

        <div className="col-lg-6">

          <div className="input-group shadow-sm">

            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search products..."
              value={keyword}
              onChange={searchHandler}
            />

          </div>

        </div>

      </div>

      {/* Products */}

      <div className="row g-4">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6"
              key={product._id}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">

            <h3>No Products Found</h3>

            <p className="text-muted">
              Try searching with another keyword.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default Shop;