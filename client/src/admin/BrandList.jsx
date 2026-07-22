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
      const { data } = await getBrands();

      const list = data.brands || data || [];

      setBrands(list);
      setFilteredBrands(list);
    } catch {
      toast.error("Unable to load brands");
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    setFilteredBrands(
      brands.filter((brand) =>
        brand.name
          ?.toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    try {
      await deleteBrand(id);

      toast.success("Brand deleted");

      loadBrands();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Brands...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Brands</h2>

        <Link
          to="/admin/brands/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Brand
        </Link>

      </div>

      <div className="input-group mb-4">

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

      <div className="card shadow">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredBrands.map((brand) => (

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
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />

                  </td>

                  <td>{brand.name}</td>

                  <td>{brand.slug}</td>

                  <td>

                    <Link
                      to={`/admin/brands/edit/${brand._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteHandler(brand._id)
                      }
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default BrandList;