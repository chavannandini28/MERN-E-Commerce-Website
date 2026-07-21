import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createProduct } from "../api/productApi";
import { getBrands } from "../api/brandApi";
import { getCategories } from "../api/categoryApi";
import { uploadImage } from "../api/uploadApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const brandRes = await getBrands();
      const categoryRes = await getCategories();

      setBrands(brandRes.data.brands || []);
      setCategories(categoryRes.data.categories || []);
    } catch (err) {
      toast.error("Unable to load brands/categories");
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    try {
      const files = Array.from(e.target.files);

      const uploadedImages = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await uploadImage(formData);

        uploadedImages.push(data.image);
      }

      setProduct({
        ...product,
        images: uploadedImages,
      });

      toast.success("Images uploaded");
    } catch {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createProduct(product);

      toast.success("Product Added Successfully");

      navigate("/vendor/products");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="card shadow border-0">

        <div className="card-body">

          <h2 className="mb-4">
            Add Product
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Product Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  SKU
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Stock
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Brand
                </label>

                <select
                  className="form-select"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
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

            </div>

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleChange}
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

            <div className="mb-4">

              <label className="form-label">
                Product Images
              </label>

              <input
                type="file"
                multiple
                className="form-control"
                onChange={handleImageUpload}
              />

            </div>

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;