import { useState } from "react";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // TODO: Call createCategory API here

    toast.success("Category added successfully");
    setName("");
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">

          <h2 className="mb-4">
            Add Category
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Category Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Category Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Add Category
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddCategory;