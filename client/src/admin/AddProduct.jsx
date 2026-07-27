import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createProduct,
} from "../api/productApi";

import {
  getCategories,
} from "../api/categoryApi";

import {
  getBrands,
} from "../api/brandApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

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

  const [thumbnail, setThumbnail] = useState(null);

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoryRes = await getCategories();

      const brandRes = await getBrands();

      setCategories(
        categoryRes.data.categories || []
      );

      setBrands(
        brandRes.data.brands || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const thumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const imagesHandler = (e) => {
    setImages([...e.target.files]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (thumbnail) {
        data.append(
          "thumbnail",
          thumbnail
        );
      }

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
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="card border-0 shadow">

        <div className="card-header bg-white">

          <h3 className="fw-bold mb-0">
            Add Product
          </h3>

        </div>

        <div className="card-body">

          <form onSubmit={submitHandler}>
                        <div className="row">

              {/* Product Title */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
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
                  name="sku"
                  className="form-control"
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
                  name="shortDescription"
                  className="form-control"
                  rows="2"
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
                  name="description"
                  className="form-control"
                  rows="5"
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

              <div className="col-md-4 mb-3">

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

              <div className="col-md-4 mb-3">

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

              {/* Cost Price */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Cost Price
                </label>

                <input
                  type="number"
                  name="costPrice"
                  className="form-control"
                  value={formData.costPrice}
                  onChange={changeHandler}
                />

              </div>

              {/* Stock */}

              <div className="col-md-6 mb-3">

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

              {/* Shipping Charge */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Shipping Charge
                </label>

                <input
                  type="number"
                  name="shippingCharge"
                  className="form-control"
                  value={formData.shippingCharge}
                  onChange={changeHandler}
                />

              </div>


                            {/* Thumbnail */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Thumbnail Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={thumbnailHandler}
                />

              </div>

              {/* Product Images */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Product Images
                </label>

                <input
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={imagesHandler}
                />

              </div>

              {/* Colors */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Colors
                </label>

                <input
                  type="text"
                  name="colors"
                  className="form-control"
                  placeholder="Black, White, Blue"
                  value={formData.colors}
                  onChange={changeHandler}
                />

              </div>

              {/* Sizes */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Sizes
                </label>

                <input
                  type="text"
                  name="sizes"
                  className="form-control"
                  placeholder="S,M,L,XL"
                  value={formData.sizes}
                  onChange={changeHandler}
                />

              </div>

              {/* Tags */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Tags
                </label>

                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  placeholder="Fashion, New, Trending"
                  value={formData.tags}
                  onChange={changeHandler}
                />

              </div>

              {/* Weight */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Weight (Kg)
                </label>

                <input
                  type="number"
                  name="weight"
                  className="form-control"
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
                  name="warranty"
                  className="form-control"
                  placeholder="1 Year"
                  value={formData.warranty}
                  onChange={changeHandler}
                />

              </div>

              {/* Return Policy */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Return Policy
                </label>

                <input
                  type="text"
                  name="returnPolicy"
                  className="form-control"
                  placeholder="7 Days Return"
                  value={formData.returnPolicy}
                  onChange={changeHandler}
                />

              </div>

              {/* Featured */}

              <div className="col-md-6 mb-3">

                <div className="form-check mt-4">

                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={changeHandler}
                  />

                  <label
                    htmlFor="featured"
                    className="form-check-label"
                  >

                    Featured Product

                  </label>

                </div>

              </div>

              {/* Active */}

              <div className="col-md-6 mb-3">

                <div className="form-check mt-4">

                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={changeHandler}
                  />

                  <label
                    htmlFor="isActive"
                    className="form-check-label"
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

                      Saving...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary px-5"
                  onClick={() => navigate("/admin/products")}
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

export default AddProduct;
        