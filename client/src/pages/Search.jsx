import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getProducts,
  searchProducts,
} from "../api/productApi";

import { getCategories } from "../api/categoryApi";
import { getBrands } from "../api/brandApi";

import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";

const Search = () => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] =
    useState([]);

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [selectedBrand, setSelectedBrand] =
    useState("");

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        productRes,
        categoryRes,
        brandRes,
      ] = await Promise.all([
        getProducts(),
        getCategories(),
        getBrands(),
      ]);

      const productData =
        productRes.data.products || [];

      setProducts(productData);

      setFilteredProducts(productData);

      setCategories(
        categoryRes.data.categories || []
      );

      setBrands(
        brandRes.data.brands || []
      );
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [
    search,
    selectedCategory,
    selectedBrand,
    sortBy,
    products,
  ]);

  const filterProducts = async () => {
    let data = [...products];

    if (search.trim()) {
      try {
        const res = await searchProducts(search);

        data = res.data.products || [];
      } catch (err) {
        console.log(err);
      }
    }

    if (selectedCategory) {
      data = data.filter(
        (item) =>
          item.category?._id === selectedCategory
      );
    }

    if (selectedBrand) {
      data = data.filter(
        (item) =>
          item.brand?._id === selectedBrand
      );
    }

    if (sortBy === "low") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "latest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    setFilteredProducts(data);
  };

  const cartHandler = async (productId) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to add to cart"
      );
    }
  };

  const wishlistHandler = async (productId) => {
    try {
      await addToWishlist({
        productId,
      });

      toast.success("Added to wishlist");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to add to wishlist"
      );
    }
  };

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">
        Search Products
      </h2>

      <div className="row">
              {/* Filter Sidebar */}

      <div className="col-lg-3 mb-4">

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <h5 className="fw-bold mb-4">
              Filters
            </h5>

            {/* Search */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Search
              </label>

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            {/* Category */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Category
              </label>

              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
              >

                <option value="">
                  All Categories
                </option>

                {categories.map((category) => (

                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Brand */}

            <div className="mb-4">

              <label className="form-label fw-semibold">
                Brand
              </label>

              <select
                className="form-select"
                value={selectedBrand}
                onChange={(e) =>
                  setSelectedBrand(e.target.value)
                }
              >

                <option value="">
                  All Brands
                </option>

                {brands.map((brand) => (

                  <option
                    key={brand._id}
                    value={brand._id}
                  >
                    {brand.name}
                  </option>

                ))}

              </select>

            </div>

            {/* Sort */}

            <div className="mb-3">

              <label className="form-label fw-semibold">
                Sort By
              </label>

              <select
                className="form-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >

                <option value="">
                  Default
                </option>

                <option value="latest">
                  Newest
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Products */}

      <div className="col-lg-9">

        <div className="row">

            {loading ? (

  <div className="col-12 text-center py-5">

    <div className="spinner-border text-primary" />

  </div>

) : filteredProducts.length === 0 ? (

  <div className="col-12">

    <div className="alert alert-warning text-center">

      No products found.

    </div>

  </div>

) : (

  filteredProducts.map((product) => (

    <div
      className="col-lg-4 col-md-6 mb-4"
      key={product._id}
    >

      <div className="card h-100 shadow-sm border-0">

        <img
          src={
            product.thumbnail?.url ||
            product.images?.[0]?.url ||
            "https://via.placeholder.com/300x250"
          }
          alt={product.title}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="fw-bold">

            {product.title}

          </h5>

          <p
            className="text-muted mb-2"
            style={{
              minHeight: "48px",
            }}
          >

            {product.shortDescription ||
              product.description?.substring(0, 70) + "..."}

          </p>

          <div className="mb-2">

            <span className="badge bg-primary me-2">

              {product.category?.name || "Category"}

            </span>

            <span className="badge bg-secondary">

              {product.brand?.name || "Brand"}

            </span>

          </div>

          <h4 className="text-success fw-bold">

            ₹{product.price}

          </h4>

          {product.stock > 0 ? (

            <span className="badge bg-success mb-3">

              In Stock ({product.stock})

            </span>

          ) : (

            <span className="badge bg-danger mb-3">

              Out of Stock

            </span>

          )}

          <div className="mt-auto d-grid gap-2">

            <Link
              to={`/product/${product._id}`}
              className="btn btn-outline-primary"
            >
              View Details
            </Link>

            <button
              className="btn btn-success"
              onClick={() =>
                cartHandler(product._id)
              }
              disabled={product.stock === 0}
            >
              Add To Cart
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() =>
                wishlistHandler(product._id)
              }
            >
              Add To Wishlist
            </button>

          </div>

        </div>

      </div>

    </div>

  ))

)}
               </div>

        <div className="d-flex justify-content-between align-items-center mt-4">

          <div>

            <strong>
              Total Products:
            </strong>{" "}
            {filteredProducts.length}

          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setSearch("");
              setSelectedCategory("");
              setSelectedBrand("");
              setSortBy("");
            }}
          >
            Clear Filters
          </button>

        </div>

      </div>

    </div>

  </div>
);

};

export default Search;