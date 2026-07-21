import { useState } from "react";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Use your existing backend API here
    console.log("Product Submitted");
  };

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Add New Product
          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Product Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Product Name"
                />

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Price"
                />

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Category
                </label>

                <select className="form-select">

                  <option>Select Category</option>

                </select>

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Brand
                </label>

                <select className="form-select">

                  <option>Select Brand</option>

                </select>

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Stock
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Available Stock"
                />

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  SKU
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="SKU Number"
                />

              </div>

              <div className="col-12 mb-4">

                <label className="form-label fw-bold">
                  Description
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Product Description"
                ></textarea>

              </div>

              <div className="col-md-6">

                <label className="form-label fw-bold">
                  Upload Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  onChange={imageHandler}
                />

              </div>

              <div className="col-md-6 text-center">

                {imagePreview ? (

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                ) : (

                  <div
                    className="border rounded d-flex justify-content-center align-items-center"
                    style={{
                      height: "220px",
                    }}
                  >
                    <div>

                      <FaCloudUploadAlt
                        size={60}
                        className="text-secondary"
                      />

                      <p className="mt-2">
                        Image Preview
                      </p>

                    </div>

                  </div>

                )}

              </div>

            </div>

            <hr />

            <div className="text-end">

              <button
                className="btn btn-success px-5"
                type="submit"
              >

                <FaSave className="me-2" />

                Save Product

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;