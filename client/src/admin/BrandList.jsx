import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTags,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getBrands,
  deleteBrand,
} from "../api/brandApi";

const BrandList = () => {
  const [loading, setLoading] = useState(true);

  const [brands, setBrands] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {

      setLoading(true);

      const { data } = await getBrands();

      setBrands(
        data.brands ||
        data.data ||
        []
      );

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to load brands."
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteHandler = async (id) => {

    if (
      !window.confirm(
        "Delete this brand?"
      )
    )
      return;

    try {

      await deleteBrand(id);

      toast.success(
        "Brand deleted successfully."
      );

      fetchBrands();

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to delete brand."
      );

    }
  };

  const filteredBrands =
    brands.filter((brand) =>
      brand.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaTags className="me-2 text-primary" />
            Brand Management
          </h2>

          <p className="text-muted mb-0">
            Manage all brands
          </p>

        </div>

        <Link
          to="/admin/brands/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Brand
        </Link>

      </div>

      <div className="card border-0 shadow">

        <div className="card-body">

          <div className="input-group mb-4">

            <span className="input-group-text">

              <FaSearch />

            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search brands..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {loading ? (

            <div className="text-center py-5">

              <div className="spinner-border text-primary" />

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>#</th>

                    <th>Brand</th>

                    <th>Description</th>

                    <th>Featured</th>

                    <th className="text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                                  {filteredBrands.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-5 text-muted"
                    >
                      No brands found.
                    </td>

                  </tr>

                ) : (

                  filteredBrands.map((brand, index) => (

                    <tr key={brand._id}>

                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {brand.name}
                      </td>

                      <td>
                        {brand.description || "-"}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            brand.featured
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {brand.featured
                            ? "Yes"
                            : "No"}
                        </span>

                      </td>

                      <td className="text-center">

                        <Link
                          to={`/admin/brands/edit/${brand._id}`}
                          className="btn btn-sm btn-warning me-2"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            deleteHandler(brand._id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </td>

                    </tr>

                  ))

                )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default BrandList;
                