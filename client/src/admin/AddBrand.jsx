import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createBrand } from "../api/brandApi";

const AddBrand = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    logo: null,
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const logoHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      logo: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      await createBrand(data);

      toast.success("Brand Created Successfully");

      navigate("/admin/brands");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create brand"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Add Brand</h2>

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

                <div className="mb-4">

                  <label className="form-label">
                    Brand Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    required
                  />

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
                            height: 220,
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
                            Upload Brand Logo
                          </h5>

                        </div>

                      )}

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={logoHandler}
                      />

                    </label>

                  </div>

                </div>

              </div>

            </div>

            <button
              className="btn btn-primary mt-4 px-5"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Brand"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddBrand;