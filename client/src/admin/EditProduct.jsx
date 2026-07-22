import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCategoryById,
  updateCategory,
} from "../api/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    try {
      const { data } = await getCategoryById(id);

      const category = data.category;

      setFormData({
        name: category.name || "",
        image: null,
      });

      setPreview(category.image?.url || "");
    } catch (error) {
      toast.error("Failed to load category");
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

      if (formData.image) {
        data.append("image", formData.image);
      }

      await updateCategory(id, data);

      toast.success("Category Updated Successfully");

      navigate("/admin/categories");
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

        <h2>Edit Category</h2>

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
                    Category Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
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
                : "Update Category"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditCategory;