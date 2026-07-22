import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCategories,
  deleteCategory,
} from "../api/categoryApi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await getCategories();

      const list = data.categories || data || [];

      setCategories(list);
      setFilteredCategories(list);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = categories.filter((item) =>
      item.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredCategories(result);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);

      toast.success("Category deleted");

      loadCategories();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Categories...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Categories</h2>

        <Link
          to="/admin/categories/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Category
        </Link>

      </div>

      <div className="input-group mb-4">

        <span className="input-group-text">
          <FaSearch />
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search Category..."
          value={keyword}
          onChange={searchHandler}
        />

      </div>

      <div className="card shadow">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>Image</th>

                <th>Name</th>

                <th>Slug</th>

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
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />

                    </td>

                    <td>{category.name}</td>

                    <td>{category.slug}</td>

                    <td>

                      <Link
                        to={`/admin/categories/edit/${category._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteHandler(category._id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center"
                  >
                    No Categories Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default CategoryList;