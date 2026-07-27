import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getProductById,
  updateProduct,
} from "../api/productApi";

import {
  getCategories,
} from "../api/categoryApi";

import {
  getBrands,
} from "../api/brandApi";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");

  const [thumbnail, setThumbnail] = useState(null);

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    costPrice: "",
    stock: "",
    sku: "",
    colors: "",
    sizes: "",
    tags: "",
    shippingCharge: "",
    weight: "",
    warranty: "",
    returnPolicy: "",
    featured: false,
    isActive: true,
  });

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
        getProductById(id),
        getCategories(),
        getBrands(),
      ]);

      const product =
        productRes.data.product;

      setCategories(
        categoryRes.data.categories || []
      );

      setBrands(
        brandRes.data.brands || []
      );

      setThumbnailPreview(
        product.thumbnail?.url || ""
      );

      setFormData({
        title: product.title || "",
        description:
          product.description || "",
        shortDescription:
          product.shortDescription || "",
        category:
          product.category?._id ||
          product.category,
        brand:
          product.brand?._id ||
          product.brand,
        price: product.price || "",
        discountPrice:
          product.discountPrice || "",
        costPrice:
          product.costPrice || "",
        stock: product.stock || "",
        sku: product.sku || "",
        colors:
          product.colors?.join(", ") || "",
        sizes:
          product.sizes?.join(", ") || "",
        tags:
          product.tags?.join(", ") || "",
        shippingCharge:
          product.shippingCharge || "",
        weight:
          product.weight || "",
        warranty:
          product.warranty || "",
        returnPolicy:
          product.returnPolicy || "",
        featured:
          product.featured || false,
        isActive:
          product.isActive ?? true,
      });
    } catch (error) {
      console.log(error);

      toast.error(
        "Unable to load product."
      );
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const thumbnailHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  const imagesHandler = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="container-fluid py-4">

      <div className="card shadow border-0">

        <div className="card-header bg-white">

          <h3 className="fw-bold mb-0">
            Edit Product
          </h3>

        </div>

        <div className="card-body">

          <form>
                        <div className="row">

              {/* Product Title */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Product Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
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
                  className="form-control"
                  name="sku"
                  value={formData.sku}
                  onChange={changeHandler}
                />

              </div>

              {/* Short Description */}

              <div className="col-12 mb-3">

                <label className="form-label">
                  Short Description
                </label>

                <textarea
                  className="form-control"
                  rows="2"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={changeHandler}
                />

              </div>

              {/* Description */}

              <div className="col-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Category */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                  required
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

                <label className="form-label">
                  Brand
                </label>

                <select
                  className="form-select"
                  name="brand"
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

              {/* Price */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
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

              <div className="col-md-3 mb-3">

                <label className="form-label">
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

              {/* Cost Price */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Cost Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="costPrice"
                  value={formData.costPrice}
                  onChange={changeHandler}
                />

              </div>

              {/* Stock */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
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

                            {/* Thumbnail Preview */}

              <div className="col-md-6 mb-4">

                <label className="form-label">
                  Current Thumbnail
                </label>

                <div className="border rounded p-3 text-center">

                  {thumbnailPreview ? (

                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "220px",
                        objectFit: "contain",
                      }}
                    />

                  ) : (

                    <p className="text-muted mb-0">
                      No Thumbnail Available
                    </p>

                  )}

                </div>

              </div>

              {/* Upload Thumbnail */}

              <div className="col-md-6 mb-4">

                <label className="form-label">
                  Change Thumbnail
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={thumbnailHandler}
                />

              </div>

              {/* Product Images */}

              <div className="col-12 mb-4">

                <label className="form-label">
                  Upload Product Images
                </label>

                <input
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={imagesHandler}
                />

                {images.length > 0 && (

                  <div className="row mt-3">

                    {images.map((image, index) => (

                      <div
                        className="col-md-2 col-4 mb-3"
                        key={index}
                      >

                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="img-fluid rounded border"
                          style={{
                            height: "90px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />

                      </div>

                    ))}

                  </div>

                )}

              </div>

              {/* Colors */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Colors
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="colors"
                  value={formData.colors}
                  onChange={changeHandler}
                  placeholder="Black, White, Blue"
                />

              </div>

              {/* Sizes */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Sizes
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="sizes"
                  value={formData.sizes}
                  onChange={changeHandler}
                  placeholder="S,M,L,XL"
                />

              </div>

              {/* Tags */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Tags
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="tags"
                  value={formData.tags}
                  onChange={changeHandler}
                  placeholder="New, Trending"
                />

              </div>

              {/* Shipping Charge */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Shipping Charge
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="shippingCharge"
                  value={formData.shippingCharge}
                  onChange={changeHandler}
                />

              </div>

              {/* Weight */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Weight
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={changeHandler}
                />

              </div>

              {/* Warranty */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Warranty
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="warranty"
                  value={formData.warranty}
                  onChange={changeHandler}
                />

              </div>

              {/* Return Policy */}

              <div className="col-12 mb-3">

                <label className="form-label">
                  Return Policy
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  name="returnPolicy"
                  value={formData.returnPolicy}
                  onChange={changeHandler}
                />

              </div>

              {/* Featured */}

              <div className="col-md-6 mb-3">

                <div className="form-check">

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

              {/* Active */}

              <div className="col-md-6 mb-3">

                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={changeHandler}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="isActive"
                  >

                    Active Product

                  </label>

                </div>

              </div>

                            <div className="col-12">

                <hr className="my-4" />

              </div>

              <div className="col-12 d-flex gap-3">

                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      />

                      Updating...

                    </>

                  ) : (

                    "Update Product"

                  )}

                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary px-5"
                  onClick={() =>
                    navigate("/admin/products")
                  }
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
          