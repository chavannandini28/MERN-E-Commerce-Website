import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLayerGroup,
} from "react-icons/fa";

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
      setLoading(true);

      const { data } = await getCategories();

      const list = data.categories || data || [];

      setCategories(list);
      setFilteredCategories(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    setFilteredCategories(
      categories.filter((item) =>
        item.name
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Categories...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaLayerGroup className="me-2 text-primary" />
            Categories
          </h2>

          <p className="text-muted">
            Manage product categories
          </p>

        </div>

        <Link
          to="/admin/add-category"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Category
        </Link>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

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

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>#</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th width="160">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCategories.length > 0 ? (

                  filteredCategories.map((category, index) => (

                    <tr key={category._id}>

                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {category.name}
                      </td>

                      <td>
                        {category.slug}
                      </td>

                      <td>

                        <button className="btn btn-warning btn-sm me-2">

                          <FaEdit />

                        </button>

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
                      className="text-center py-5"
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

    </div>
  );
};

export default CategoryList;