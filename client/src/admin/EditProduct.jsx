import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";

import {
  getProductById,
  updateProduct,
} from "../api/productApi";

import { getCategories } from "../api/categoryApi";
import { getBrands } from "../api/brandApi";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    image: null,
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const productRes = await getProductById(id);
      const categoryRes = await getCategories();
      const brandRes = await getBrands();

      const product = productRes.data.product;

      setCategories(categoryRes.data.categories || []);
      setBrands(brandRes.data.brands || []);

      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category?._id || "",
        brand: product.brand?._id || "",
        image: null,
      });

      setPreview(product.images?.[0]?.url || "");
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);
      data.append("brand", formData.brand);

      if (formData.image) {
        data.append("images", formData.image);
      }

      await updateProduct(id, data);

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Edit Product
        </h2>

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

              <div className="col-lg-8">

                <div className="mb-3">

                  <label className="form-label">
                    Product Name
                  </label>

                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    rows="5"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={changeHandler}
                    required
                  />

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
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

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
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

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Category
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={changeHandler}
                    >

                      {categories.map((item) => (
                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Brand
                    </label>

                    <select
                      className="form-select"
                      name="brand"
                      value={formData.brand}
                      onChange={changeHandler}
                    >

                      {brands.map((item) => (
                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

              </div>

              <div className="col-lg-4">

                <div className="card">

                  <div className="card-body text-center">

                    <label style={{ cursor: "pointer" }}>

                      {preview ? (

                        <img
                          src={preview}
                          alt="Preview"
                          className="img-fluid rounded"
                          style={{
                            height: 250,
                            objectFit: "cover",
                          }}
                        />

                      ) : (

                        <div className="py-5">

                          <FaCloudUploadAlt
                            size={60}
                            className="text-primary"
                          />

                          <h5 className="mt-3">
                            Upload Image
                          </h5>

                        </div>

                      )}

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={imageHandler}
                      />

                    </label>

                  </div>

                </div>

              </div>

            </div>

            <button
              className="btn btn-success mt-4 px-5"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Product"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;