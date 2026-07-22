import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getBrandById,
  updateBrand,
} from "../api/brandApi";

const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    country: "",
    logo: null,
  });

  useEffect(() => {
    loadBrand();
  }, [id]);

  const loadBrand = async () => {
    try {
      const { data } = await getBrandById(id);

      const brand = data.brand;

      setFormData({
        name: brand.name || "",
        description: brand.description || "",
        website: brand.website || "",
        country: brand.country || "",
        logo: null,
      });

      setPreview(brand.logo?.url || "");
    } catch (error) {
      toast.error("Failed to load brand");
    }
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const logoHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("website", formData.website);
      data.append("country", formData.country);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      await updateBrand(id, data);

      toast.success("Brand Updated Successfully");

      navigate("/admin/brands");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Edit Brand</h2>

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

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={changeHandler}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Website
                  </label>

                  <input
                    type="url"
                    className="form-control"
                    name="website"
                    value={formData.website}
                    onChange={changeHandler}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Country
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={changeHandler}
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
                          alt="Logo Preview"
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
                            Upload Logo
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
              className="btn btn-success mt-4 px-5"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Brand"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditBrand;