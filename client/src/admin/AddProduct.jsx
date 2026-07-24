import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaImage,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createProduct } from "../api/productApi";
import { getBrands } from "../api/brandApi";
import { getCategories } from "../api/categoryApi";

const AddProduct = () => {
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
    loadBrands();
    loadCategories();
  }, []);

  const loadBrands = async () => {
    try {
      const { data } = await getBrands();
      setBrands(data?.brands || data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load brands"
      );
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data?.categories || data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load categories"
      );
    }
  };

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    setPreview(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

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

      Object.entries(formData).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      images.forEach((image) => {
        data.append("images", image);
      });

      await createProduct(data);

      toast.success(
        "Product Added Successfully"
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Add New Product
          </h2>

          <p className="text-muted">
            Create a new product
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

        <div className="card-body">

          <form onSubmit={submitHandler}>

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
    placeholder="Enter product title"
    required
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
    placeholder="Product SKU"
  />
</div>

{/* Description */}
<div className="col-12 mb-3">
  <label className="form-label fw-semibold">
    Description
  </label>

  <textarea
    rows={5}
    className="form-control"
    name="description"
    value={formData.description}
    onChange={changeHandler}
    placeholder="Full product description"
  />
</div>

{/* Short Description */}
<div className="col-12 mb-3">
  <label className="form-label fw-semibold">
    Short Description
  </label>

  <textarea
    rows={3}
    className="form-control"
    name="shortDescription"
    value={formData.shortDescription}
    onChange={changeHandler}
    placeholder="Short description"
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
    required
  >
    <option value="">Select Category</option>

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
    required
  >
    <option value="">Select Brand</option>

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
    required
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
    required
  />
</div>

{/* Featured */}
<div className="col-12 mb-4">
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      id="featured"
      name="featured"
      checked={formData.featured}
      onChange={changeHandler}
    />

    <label
      className="form-check-label"
      htmlFor="featured"
    >
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
    accept="image/*"
    multiple
    onChange={imageHandler}
  />
</div>

{/* Image Preview */}
{preview.length > 0 && (
  <div className="col-12 mb-4">
    <div className="row">
      {preview.map((image, index) => (
        <div
          className="col-lg-2 col-md-3 col-4 mb-3"
          key={index}
        >
          <img
            src={image}
            alt="Preview"
            className="img-fluid rounded shadow-sm border"
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  </div>
)}

{/* Submit Button */}
<div className="col-12">
  <div className="d-flex justify-content-end gap-2">

    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => navigate(-1)}
    >
      Cancel
    </button>

    <button
      type="submit"
      className="btn btn-primary"
      disabled={loading}
    >
      <FaSave className="me-2" />

      {loading
        ? "Saving..."
        : "Save Product"}
    </button>

  </div>
</div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
            