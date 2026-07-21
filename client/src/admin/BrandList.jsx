import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTags,
} from "react-icons/fa";

import {
  getBrands,
  deleteBrand,
} from "../api/brandApi";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);

      const { data } = await getBrands();

      const list = data.brands || data || [];

      setBrands(list);
      setFilteredBrands(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    setFilteredBrands(
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    try {
      await deleteBrand(id);
      loadBrands();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Brands...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaTags className="me-2 text-primary" />
            Brand Management
          </h2>

          <p className="text-muted">
            Manage all brands
          </p>

        </div>

        <Link
          to="/admin/add-brand"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Brand
        </Link>

      </div>

      <div className="card border-0 shadow">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  className="form-control"
                  placeholder="Search Brand..."
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
                  <th>Brand Name</th>
                  <th>Slug</th>
                  <th width="170">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredBrands.length > 0 ? (

                  filteredBrands.map((brand, index) => (

                    <tr key={brand._id}>

                      <td>{index + 1}</td>

                      <td className="fw-semibold">
                        {brand.name}
                      </td>

                      <td>
                        {brand.slug}
                      </td>

                      <td>

                        <button className="btn btn-warning btn-sm me-2">

                          <FaEdit />

                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHandler(brand._id)}
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
                      No Brands Found
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

export default BrandList;