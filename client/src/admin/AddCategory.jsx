import { useState } from "react";
import { FaFolderPlus, FaSave, FaTag } from "react-icons/fa";

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const changeHandler = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Use your existing API here
    console.log(category);
  };

  return (
    <div className="container-fluid">

      <div className="card border-0 shadow rounded-4">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">

            <FaFolderPlus className="me-2" />

            Add New Category

          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Category Name"
                  name="name"
                  value={category.name}
                  onChange={changeHandler}
                />

              </div>

              <div className="col-md-6 mb-4">

                <label className="form-label fw-bold">
                  Category Slug
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <FaTag />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="category-slug"
                    name="slug"
                    value={category.slug}
                    onChange={changeHandler}
                  />

                </div>

              </div>

              <div className="col-12 mb-4">

                <label className="form-label fw-bold">
                  Description
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Enter Category Description"
                  name="description"
                  value={category.description}
                  onChange={changeHandler}
                ></textarea>

              </div>

            </div>

            <div className="text-end">

              <button
                className="btn btn-success px-5"
                type="submit"
              >

                <FaSave className="me-2" />

                Save Category

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddCategory;