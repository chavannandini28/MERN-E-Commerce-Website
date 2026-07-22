import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createProduct } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { getBrands } from "../api/brandApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    sku: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    brand: "",
    featured: false,
    thumbnail: null,
    images: [],
  });

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await getCategories();

      setCategories(data.categories || data || []);
    } catch (error) {
      toast.error("Unable to load categories");
    }
  };

  const loadBrands = async () => {
    try {
      const { data } = await getBrands();

      setBrands(data.brands || data || []);
    } catch (error) {
      toast.error("Unable to load brands");
    }
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const thumbnailHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  const imagesHandler = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.thumbnail) {
      return toast.error("Thumbnail is required");
    }

    if (formData.images.length === 0) {
      return toast.error(
        "Please upload product images"
      );
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("slug", formData.slug);
      data.append(
        "description",
        formData.description
      );
      data.append("sku", formData.sku);
      data.append("price", formData.price);
      data.append(
        "discountPrice",
        formData.discountPrice
      );
      data.append("stock", formData.stock);
      data.append(
        "category",
        formData.category
      );
      data.append("brand", formData.brand);
      data.append(
        "featured",
        formData.featured
      );

      data.append(
        "thumbnail",
        formData.thumbnail
      );

      formData.images.forEach((image) => {
        data.append("images", image);
      });

      // API call will be added in Part 3
            await createProduct(data);

      toast.success("Product Added Successfully");

      navigate("/admin/products");

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white">

          <h3 className="mb-0">
            Add New Product
          </h3>

        </div>

        <div className="card-body">

          <form onSubmit={submitHandler}>

            <div className="row">

              {/* Product Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Slug */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  className="form-control"
                  value={formData.slug}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* SKU */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  className="form-control"
                  value={formData.sku}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Price */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Discount Price */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Discount Price
                </label>

                <input
                  type="number"
                  name="discountPrice"
                  className="form-control"
                  value={formData.discountPrice}
                  onChange={changeHandler}
                />

              </div>

              {/* Stock */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  value={formData.stock}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Category */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={changeHandler}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (

                    <option
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* Brand */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Brand
                </label>

                <select
                  name="brand"
                  className="form-select"
                  value={formData.brand}
                  onChange={changeHandler}
                  required
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

              {/* Description */}

              <div className="col-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Featured */}

              <div className="col-12 mb-4">

                <div className="form-check">

                  <input
                    type="checkbox"
                    name="featured"
                    className="form-check-input"
                    checked={formData.featured}
                    onChange={changeHandler}
                  />

                  <label className="form-check-label">
                    Featured Product
                  </label>

                </div>

              </div>

              {/* Thumbnail */}

              <div className="col-md-6 mb-4">

                <label className="form-label">
                  Thumbnail
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={thumbnailHandler}
                />

                {thumbnailPreview && (

                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="img-thumbnail mt-3"
                    style={{
                      width: 180,
                      height: 180,
                      objectFit: "cover",
                    }}
                  />

                )}

              </div>

              {/* Product Images */}

              <div className="col-md-6 mb-4">

                <label className="form-label">
                  Product Images
                </label>

                <input
                  type="file"
                  multiple
                  className="form-control"
                  accept="image/*"
                  onChange={imagesHandler}
                />

                <div className="d-flex flex-wrap gap-2 mt-3">

                  {imagePreviews.map((image, index) => (

                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="img-thumbnail"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                      }}
                    />

                  ))}

                </div>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Creating Product..."
                : "Create Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );

  };

export default AddProduct;