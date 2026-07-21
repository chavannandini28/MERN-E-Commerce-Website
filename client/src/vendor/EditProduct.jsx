import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getProductById, updateProduct } from "../api/productApi";
import { getBrands } from "../api/brandApi";
import { getCategories } from "../api/categoryApi";
import { uploadImage } from "../api/uploadApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

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
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const [productRes, brandRes, categoryRes] = await Promise.all([
        getProductById(id),
        getBrands(),
        getCategories(),
      ]);

      const p = productRes.data.product;

      setProduct({
        name: p.name || "",
        description: p.description || "",
        sku: p.sku || "",
        price: p.price || "",
        stock: p.stock || "",
        brand: p.brand?._id || p.brand || "",
        category: p.category?._id || p.category || "",
        images: p.images || [],
      });

      setBrands(brandRes.data.brands || []);
      setCategories(categoryRes.data.categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load product");
    } finally {
      setLoading(false);
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
      const uploaded = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await uploadImage(formData);

        uploaded.push(data.image);
      }

      setProduct({
        ...product,
        images: uploaded,
      });

      toast.success("Images uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProduct(id, product);

      toast.success("Product updated successfully");

      navigate("/vendor/products");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
        <div className="card-body">

          <h2 className="mb-4">Edit Product</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
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
              <label className="form-label">Description</label>
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
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  className="form-control"
                  name="sku"
                  value={product.sku}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>
                <select
                  className="form-select"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>

                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleChange}
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

            <div className="mb-3">
              <label className="form-label">Replace Images</label>

              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleImageUpload}
              />
            </div>

            {product.images.length > 0 && (
              <div className="row mb-3">
                {product.images.map((img, index) => (
                  <div
                    className="col-md-2 col-4"
                    key={index}
                  >
                    <img
                      src={img.url || img}
                      alt="product"
                      className="img-fluid rounded border"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditProduct;