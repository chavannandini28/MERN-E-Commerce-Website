import { useState } from "react";
import { toast } from "react-toastify";

const AddBrand = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    // TODO: Call your createBrand API here
    console.log("Brand:", name);

    toast.success("Brand added successfully");

    setName("");
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <h2 className="mb-4">Add Brand</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Brand Name</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Brand Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;