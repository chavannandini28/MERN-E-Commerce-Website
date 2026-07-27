import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaGlobe,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getBrands,
  deleteBrand,
} from "../api/brandApi";

const BrandList = () => {
  const [loading, setLoading] = useState(true);

  const [brands, setBrands] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);

      const { data } = await getBrands();

      setBrands(data.brands || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load brands"
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this brand?"
    );

    if (!confirmDelete) return;

    try {

      await deleteBrand(id);

      toast.success(
        "Brand deleted successfully"
      );

      loadBrands();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name
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

          Brand Management

        </h2>

        <Link
          to="/admin/brands/add"
          className="btn btn-primary"
        >

          <FaPlus className="me-2" />

          Add Brand

        </Link>

      </div>

      <div className="card border-0 shadow-sm">

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
                  placeholder="Search Brand..."
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

                  <th>Logo</th>

                  <th>Brand Name</th>

                  <th>Slug</th>

                  <th>Website</th>

                  <th>Status</th>

                  <th>Products</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredBrands.length > 0 ? (

                  filteredBrands.map((brand) => (

                    <tr key={brand._id}>

                      <td>

                        <img
                          src={
                            brand.logo?.url ||
                            "https://via.placeholder.com/60"
                          }
                          alt={brand.name}
                          width="60"
                          height="60"
                          className="rounded border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>

                        <h6 className="fw-bold mb-0">

                          {brand.name}

                        </h6>

                      </td>

                      <td>

                        <code>

                          {brand.slug}

                        </code>

                      </td>

                      <td>

                        {brand.website ? (

                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >

                            <FaGlobe className="me-1" />

                            Visit

                          </a>

                        ) : (

                          <span className="text-muted">

                            N/A

                          </span>

                        )}

                      </td>

                      <td>

                        {brand.isActive ? (

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

                          {brand.productCount || 0}

                        </span>

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/brands/edit/${brand._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(brand._id)
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
                      colSpan="7"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Brands Found

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
                Total Brands :
              </strong>

              <span className="badge bg-primary ms-2">

                {filteredBrands.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0">

              <button
                className="btn btn-outline-secondary"
                onClick={loadBrands}
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

export default BrandList;