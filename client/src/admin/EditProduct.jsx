import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaArrowLeft, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getProductById,
  updateProduct,
} from "../api/productApi";

import { getBrands } from "../api/brandApi";
import { getCategories } from "../api/categoryApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    featured: false,
  });

  useEffect(() => {
    fetchProduct();
    fetchBrands();
    fetchCategories();
  }, [id]);

  // ==========================
  // Product
  // ==========================

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await getProductById(id);

      const product =
        data.product || data.data;

      setFormData({
        title: product.title || "",
        description:
          product.description || "",
        shortDescription:
          product.shortDescription || "",
        category:
          product.category?._id ||
          product.category ||
          "",
        brand:
          product.brand?._id ||
          product.brand ||
          "",
        price: product.price || "",
        discountPrice:
          product.discountPrice || "",
        stock: product.stock || "",
        sku: product.sku || "",
        featured:
          product.featured || false,
      });

      if (product.images) {
        setPreview(
          product.images.map((img) => img.url)
        );
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Brands
  // ==========================

  const fetchBrands = async () => {
    try {
      const { data } =
        await getBrands();

      setBrands(
        data.brands ||
        data.data ||
        []
      );
    } catch {}
  };

  // ==========================
  // Categories
  // ==========================

  const fetchCategories = async () => {
    try {
      const { data } =
        await getCategories();

      setCategories(
        data.categories ||
        data.data ||
        []
      );
    } catch {}
  };

  // ==========================
  // Input Change
  // ==========================

  const changeHandler = (e) => {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================
  // Images
  // ==========================

  const imageHandler = (e) => {
    const files = Array.from(
      e.target.files
    );

    setImages(files);

    setPreview(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

    return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Edit Product
          </h2>

          <p className="text-muted mb-0">
            Update product information
          </p>

        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

      <div className="card shadow border-0">

        <div className="card-body p-4">

          <form>

            <div className="row">

              {/* Product Title */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Product Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                />

              </div>

              {/* SKU */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  SKU
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={formData.sku}
                  onChange={changeHandler}
                />

              </div>

              {/* Description */}

              <div className="col-12 mb-3">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                />

              </div>

              {/* Short Description */}

              <div className="col-12 mb-3">

                <label className="form-label fw-semibold">
                  Short Description
                </label>

                <textarea
                  rows="2"
                  className="form-control"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={changeHandler}
                />

              </div>

              {/* Category */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                >

                  <option value="">
                    Select Category
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

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Brand
                </label>

                <select
                  className="form-select"
                  name="brand"
                  value={formData.brand}
                  onChange={changeHandler}
                >

                  <option value="">
                    Select Brand
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

              {/* Price */}

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={changeHandler}
                />

              </div>

              {/* Discount Price */}

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold">
                  Discount Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={changeHandler}
                />

              </div>

              {/* Stock */}

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold">
                  Stock
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={changeHandler}
                />

              </div>

              {/* Featured */}

              <div className="col-12 mb-4">

                <div className="form-check form-switch">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={changeHandler}
                  />

                  <label className="form-check-label">
                    Featured Product
                  </label>

                </div>

              </div>
                            {/* Product Images */}

              <div className="col-12 mb-4">

                <label className="form-label fw-semibold">
                  <FaImage className="me-2" />
                  Product Images
                </label>

                <input
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={imageHandler}
                />

              </div>

              {/* Image Preview */}

              {preview.length > 0 && (

                <div className="col-12 mb-4">

                  <div className="row">

                    {preview.map((img, index) => (

                      <div
                        key={index}
                        className="col-lg-2 col-md-3 col-6 mb-3"
                      >

                        <img
                          src={img}
                          alt="Preview"
                          className="img-fluid rounded shadow border"
                          style={{
                            height: "140px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />

                      </div>

                    ))}

                  </div>

                </div>

              )}

              {/* Buttons */}

              <div className="col-12">

                <button
                  type="button"
                  className="btn btn-primary px-5 me-3"
                  disabled={loading}
                  onClick={async () => {

                    if (
                      !formData.title ||
                      !formData.category ||
                      !formData.brand ||
                      !formData.price
                    ) {
                      return toast.error(
                        "Please fill all required fields."
                      );
                    }

                    try {

                      setLoading(true);

                      const data = new FormData();

                      data.append("title", formData.title);
                      data.append(
                        "description",
                        formData.description
                      );
                      data.append(
                        "shortDescription",
                        formData.shortDescription
                      );
                      data.append(
                        "category",
                        formData.category
                      );
                      data.append(
                        "brand",
                        formData.brand
                      );
                      data.append(
                        "price",
                        formData.price
                      );
                      data.append(
                        "discountPrice",
                        formData.discountPrice
                      );
                      data.append(
                        "stock",
                        formData.stock
                      );
                      data.append(
                        "sku",
                        formData.sku
                      );
                      data.append(
                        "featured",
                        formData.featured
                      );

                      images.forEach((image) => {
                        data.append("images", image);
                      });

                      await updateProduct(id, data);

                      toast.success(
                        "Product Updated Successfully"
                      );

                      navigate("/admin/products");

                    } catch (error) {

                      toast.error(
                        error?.response?.data?.message ||
                        "Unable to update product"
                      );

                    } finally {

                      setLoading(false);

                    }

                  }}
                >

                  <FaSave className="me-2" />

                  {loading
                    ? "Updating..."
                    : "Update Product"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;