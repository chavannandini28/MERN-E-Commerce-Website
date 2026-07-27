import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getCategories,
  deleteCategory,
} from "../api/categoryApi";

const CategoryList = () => {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);

      const { data } = await getCategories();

      setCategories(data.categories || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load categories"
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      toast.success(
        "Category Deleted Successfully"
      );

      loadCategories();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }
  };

  const filteredCategories =
    categories.filter((category) =>
      category.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Category Management

        </h2>

        <Link
          to="/admin/categories/add"
          className="btn btn-primary"
        >

          <FaPlus className="me-2" />

          Add Category

        </Link>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">

                  <FaSearch />

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Category..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>


                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Slug</th>

                  <th>Status</th>

                  <th>Products</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredCategories.length > 0 ? (

                  filteredCategories.map((category) => (

                    <tr key={category._id}>

                      <td>

                        <img
                          src={
                            category.image?.url ||
                            "https://via.placeholder.com/60"
                          }
                          alt={category.name}
                          width="60"
                          height="60"
                          className="rounded border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>

                        <h6 className="mb-0 fw-bold">

                          {category.name}

                        </h6>

                      </td>

                      <td>

                        <code>

                          {category.slug}

                        </code>

                      </td>

                      <td>

                        {category.isActive ? (

                          <span className="badge bg-success">

                            Active

                          </span>

                        ) : (

                          <span className="badge bg-secondary">

                            Inactive

                          </span>

                        )}

                      </td>

                      <td>

                        <span className="badge bg-info">

                          {category.productCount || 0}

                        </span>

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/categories/edit/${category._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(category._id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Categories Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

                    <hr />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">

            <div>

              <strong>
                Total Categories :
              </strong>

              <span className="badge bg-primary ms-2">

                {filteredCategories.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0">

              <button
                className="btn btn-outline-secondary"
                onClick={loadCategories}
              >

                Refresh List

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CategoryList;