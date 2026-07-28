import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";

import {
  getStoreSettings,
  updateStoreSettings,
} from "../api/settingsApi";

const Settings = () => {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({

    storeName: "",

    email: "",

    phone: "",

    address: "",

    facebook: "",

    instagram: "",

    twitter: "",

    linkedin: "",

    shippingCharge: "",

    freeShippingLimit: "",

    tax: "",

    currency: "INR",

  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {

    try {

      setLoading(true);

      const { data } =
        await getStoreSettings();

      setFormData({
        ...formData,
        ...data.settings,
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load settings"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateStoreSettings(formData);

      toast.success(
        "Settings Updated Successfully"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container py-4">

      <div className="card shadow border-0">

        <div className="card-header bg-white">

          <h3 className="fw-bold mb-0">

            Store Settings

          </h3>

        </div>

        <div className="card-body">

          <form onSubmit={submitHandler}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Store Name

                </label>

                <input
                  type="text"
                  name="storeName"
                  className="form-control"
                  value={formData.storeName}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Store Email

                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

                            <div className="col-md-6 mb-3">

                <label className="form-label">

                  Store Phone

                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Store Address

                </label>

                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Facebook URL

                </label>

                <input
                  type="text"
                  name="facebook"
                  className="form-control"
                  value={formData.facebook}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Instagram URL

                </label>

                <input
                  type="text"
                  name="instagram"
                  className="form-control"
                  value={formData.instagram}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Twitter / X URL

                </label>

                <input
                  type="text"
                  name="twitter"
                  className="form-control"
                  value={formData.twitter}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  LinkedIn URL

                </label>

                <input
                  type="text"
                  name="linkedin"
                  className="form-control"
                  value={formData.linkedin}
                  onChange={handleChange}
                />

              </div>

              <hr className="my-4" />

              <h5 className="fw-bold mb-3">

                Shipping Settings

              </h5>

              <div className="col-md-4 mb-3">

                <label className="form-label">

                  Shipping Charge

                </label>

                <input
                  type="number"
                  name="shippingCharge"
                  className="form-control"
                  value={formData.shippingCharge}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">

                  Free Shipping Limit

                </label>

                <input
                  type="number"
                  name="freeShippingLimit"
                  className="form-control"
                  value={formData.freeShippingLimit}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-2 mb-3">

                <label className="form-label">

                  Tax (%)

                </label>

                <input
                  type="number"
                  name="tax"
                  className="form-control"
                  value={formData.tax}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-2 mb-3">

                <label className="form-label">

                  Currency

                </label>

                <select
                  name="currency"
                  className="form-select"
                  value={formData.currency}
                  onChange={handleChange}
                >

                  <option value="INR">

                    INR

                  </option>

                  <option value="USD">

                    USD

                  </option>

                  <option value="EUR">

                    EUR

                  </option>

                  <option value="GBP">

                    GBP

                  </option>

                </select>

              </div>

                            <hr className="my-4" />

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

                <div>

                  <small className="text-muted">

                    Last Updated :
                    {" "}
                    {new Date().toLocaleString()}

                  </small>

                </div>

                <div className="mt-3 mt-md-0 d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={loadSettings}
                  >

                    Reload

                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >

                    {saving
                      ? "Saving..."
                      : "Save Settings"}

                  </button>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Settings;