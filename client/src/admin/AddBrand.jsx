import { useState } from "react";
import {
  FaTags,
  FaSave,
  FaCloudUploadAlt,
} from "react-icons/fa";

const AddBrand = () => {
  const [brand, setBrand] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const changeHandler = (e) => {
    setBrand({
      ...brand,
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

    // Call your existing API here

    console.log(brand);
  };

  return (
    <div className="container-fluid py-4">

      <div className="card border-0 shadow-lg rounded-4">

        <div className="card-header bg-primary text-white py-3">

          <h3 className="mb-0">

            <FaTags className="me-2" />

            Add Brand

          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={submitHandler}>

            <div className="row">

              {/* Left */}

              <div className="col-lg-8">

                <div className="mb-4">

                  <label className="form-label fw-bold">

                    Brand Name

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Brand Name"
                    name="name"
                    value={brand.name}
                    onChange={changeHandler}
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">

                    Brand Slug

                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="brand-slug"
                    name="slug"
                    value={brand.slug}
                    onChange={changeHandler}
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-bold">

                    Description

                  </label>

                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Write Brand Description..."
                    name="description"
                    value={brand.description}
                    onChange={changeHandler}
                  ></textarea>

                </div>

              </div>

              {/* Right */}

              <div className="col-lg-4">

                <div className="card shadow-sm">

                  <div className="card-body text-center">

                    {preview ? (

                      <img
                        src={preview}
                        alt="Preview"
                        className="img-fluid rounded mb-3"
                        style={{
                          height: "220px",
                          objectFit: "contain",
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

                            Brand Logo Preview

                          </p>

                        </div>

                      </div>

                    )}

                    <input
                      type="file"
                      className="form-control mt-3"
                      onChange={imageHandler}
                    />

                  </div>

                </div>

              </div>

            </div>

            <hr />

            <div className="text-end">

              <button
                className="btn btn-success px-5"
                type="submit"
              >

                <FaSave className="me-2" />

                Save Brand

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddBrand;