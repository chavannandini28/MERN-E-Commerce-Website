import { useState } from "react";
import { FaSave, FaImage } from "react-icons/fa";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "Apple iPhone 16",
    price: 79999,
    stock: 15,
    sku: "IPH16-001",
    description:
      "Latest Apple flagship smartphone with A18 chip.",
    category: "Mobiles",
    brand: "Apple",
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300"
  );

  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    if (e.target.files[0]) {
      setPreview(
        URL.createObjectURL(e.target.files[0])
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Use your existing update product API here
    console.log(product);
  };

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-warning">

          <h3 className="fw-bold mb-0">
            Edit Product
          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-lg-8">

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      Product Name
                    </label>

                    <input
                      className="form-control"
                      name="name"
                      value={product.name}
                      onChange={changeHandler}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      Price
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={product.price}
                      onChange={changeHandler}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      Stock
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="stock"
                      value={product.stock}
                      onChange={changeHandler}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      SKU
                    </label>

                    <input
                      className="form-control"
                      name="sku"
                      value={product.sku}
                      onChange={changeHandler}
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      Category
                    </label>

                    <select
                      className="form-select"
                      name="category"
                      value={product.category}
                      onChange={changeHandler}
                    >

                      <option>Mobiles</option>
                      <option>Laptops</option>
                      <option>Accessories</option>

                    </select>

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label fw-bold">
                      Brand
                    </label>

                    <select
                      className="form-select"
                      name="brand"
                      value={product.brand}
                      onChange={changeHandler}
                    >

                      <option>Apple</option>
                      <option>Samsung</option>
                      <option>Sony</option>

                    </select>

                  </div>

                  <div className="col-12 mb-3">

                    <label className="form-label fw-bold">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      className="form-control"
                      name="description"
                      value={product.description}
                      onChange={changeHandler}
                    ></textarea>

                  </div>

                </div>

              </div>

              <div className="col-lg-4">

                <div className="card shadow-sm">

                  <div className="card-body text-center">

                    <img
                      src={preview}
                      alt="Preview"
                      className="img-fluid rounded mb-3"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />

                    <input
                      type="file"
                      className="form-control"
                      onChange={imageHandler}
                    />

                    <FaImage
                      className="mt-3 text-secondary"
                      size={40}
                    />

                  </div>

                </div>

              </div>

            </div>

            <hr />

            <div className="text-end">

              <button
                className="btn btn-warning px-5"
                type="submit"
              >

                <FaSave className="me-2" />

                Update Product

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;