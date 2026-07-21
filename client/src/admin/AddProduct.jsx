import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";

import { createProduct } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { getBrands } from "../api/brandApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    images: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoryRes = await getCategories();
      const brandRes = await getBrands();

      setCategories(categoryRes.data.categories || []);
      setBrands(brandRes.data.brands || []);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      images: file,
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

      if (formData.images) {
        data.append("images", formData.images);
      }

      await createProduct(data);

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
          Add Product
        </h2>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

      <div className="card border-0 shadow">

        <div className="card-body p-4">

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
                      required
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
                      required
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
                      required
                    >

                      <option value="">
                        Select Category
                      </option>

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
                      required
                    >

                      <option value="">
                        Select Brand
                      </option>

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

                <div className="card border">

                  <div className="card-body text-center">

                    <label
                      className="w-100"
                      style={{ cursor: "pointer" }}
                    >

                      {preview ? (

                        <img
                          src={preview}
                          alt="Preview"
                          className="img-fluid rounded"
                          style={{
                            height: 260,
                            objectFit: "cover",
                          }}
                        />

                      ) : (

                        <div className="py-5">

                          <FaCloudUploadAlt
                            size={60}
                            className="text-primary mb-3"
                          />

                          <h5>
                            Upload Product Image
                          </h5>

                          <p className="text-muted">
                            JPG, PNG, WEBP
                          </p>

                        </div>

                      )}

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={imageHandler}
                      />

                    </label>

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-4">

              <button
                className="btn btn-primary px-5"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create Product"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;