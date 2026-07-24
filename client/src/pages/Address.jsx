import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../api/addressApi";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setLoading(true);

      const { data } = await getAddresses();

      setAddresses(data.addresses || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      fullName: "",
      phone: "",
      house: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress(editingId, formData);

        toast.success("Address updated successfully");
      } else {
        await createAddress(formData);

        toast.success("Address added successfully");
      }

      resetForm();
      loadAddresses();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const editHandler = (address) => {
    setEditingId(address._id);

    setFormData({
      fullName: address.fullName || "",
      phone: address.phone || "",
      house: address.house || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeHandler = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    try {
      await deleteAddress(id);

      toast.success("Address deleted");

      loadAddresses();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const defaultHandler = async (id) => {
    try {
      await setDefaultAddress(id);

      toast.success("Default address updated");

      loadAddresses();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          <FaMapMarkerAlt className="me-2 text-primary" />
          My Addresses
        </h2>

              </div>

      <div className="card shadow border-0 mb-5">

        <div className="card-body">

          <h4 className="mb-4">

            <FaPlus className="me-2 text-success" />

            {editingId
              ? "Update Address"
              : "Add New Address"}

          </h4>

          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Mobile Number
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  House / Flat No.
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="house"
                  value={formData.house}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Street / Area
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={formData.street}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  City
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  State
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Pincode
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={formData.pincode}
                  onChange={changeHandler}
                  required
                />

              </div>

              <div className="col-md-12 mb-4">

                <label className="form-label">
                  Country
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={changeHandler}
                />

              </div>

            </div>

            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn btn-primary"
              >
                <FaSave className="me-2" />

                {editingId
                  ? "Update Address"
                  : "Save Address"}

              </button>

              {editingId && (

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>

              )}

            </div>

          </form>

        </div>

      </div>

      <div className="row">
  {loading ? (
    <div className="col-12 text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  ) : addresses.length === 0 ? (
    <div className="col-12">
      <div className="alert alert-info text-center">
        No addresses found.
      </div>
    </div>
  ) : (
    addresses.map((address) => (
      <div
        className="col-lg-6 mb-4"
        key={address._id}
      >
        <div
          className={`card shadow border-0 h-100 ${
            address.isDefault ? "border border-success" : ""
          }`}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="fw-bold mb-0">{address.fullName}</h5>

              {address.isDefault && (
                <span className="badge bg-success">
                  Default
                </span>
              )}
            </div>

            <p><strong>Phone:</strong> {address.phone}</p>
            <p>{address.house}</p>
            <p>{address.street}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.country} - {address.pincode}</p>

            <hr />

            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => editHandler(address)}
              >
                <FaEdit className="me-1" />
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeHandler(address._id)}
              >
                <FaTrash className="me-1" />
                Delete
              </button>

              {!address.isDefault && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => defaultHandler(address._id)}
                >
                  <FaCheck className="me-1" />
                  Set Default
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default Address;
      