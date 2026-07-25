import { useEffect, useState } from "react";
import {
  FaHistory,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getSystemLogs,
} from "../api/systemLogApi";

const SystemLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const { data } = await getSystemLogs();

      setLogs(data.logs || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load logs."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.action
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            <FaHistory className="me-2 text-primary" />

            System Logs

          </h2>

          <p className="text-muted mb-0">
            Monitor system activities
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={fetchLogs}
        >

          <FaSyncAlt className="me-2" />

          Refresh

        </button>

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
              placeholder="Search by action..."
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

                <thead className="table-light">

                  <tr>

                    <th>User</th>

                    <th>Action</th>

                    <th>Module</th>

                    <th>Status</th>

                    <th>Date & Time</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredLogs.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >

                        <FaHistory
                          size={50}
                          className="text-secondary mb-3"
                        />

                        <h5>No Logs Found</h5>

                        <p className="text-muted mb-0">
                          There are no matching system logs.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    filteredLogs.map((log) => (

                      <tr key={log._id}>

                        <td>

                          {log.user?.name || "System"}

                        </td>

                        <td>

                          {log.action}

                        </td>

                        <td>

                          {log.module || "-"}

                        </td>

                        <td>

                          <span
                            className={`badge ${
                              log.status === "Success"
                                ? "bg-success"
                                : log.status === "Failed"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >

                            {log.status || "Unknown"}

                          </span>

                        </td>

                        <td>

                          {new Date(
                            log.createdAt
                          ).toLocaleString()}

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

export default SystemLogs;
        