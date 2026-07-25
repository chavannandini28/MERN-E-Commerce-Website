import { useEffect, useState } from "react";
import {
  FaBell,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../api/notificationApi";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const { data } =
        await getNotifications();

      setNotifications(
        data.notifications || []
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      toast.success(
        "Notification marked as read."
      );

      fetchNotifications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update notification."
      );
    }
  };

  const deleteItem = async (id) => {
    if (
      !window.confirm(
        "Delete this notification?"
      )
    )
      return;

    try {
      await deleteNotification(id);

      toast.success(
        "Notification deleted."
      );

      fetchNotifications();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete notification."
      );
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            <FaBell className="me-2 text-primary" />

            Notifications

          </h2>

          <p className="text-muted mb-0">
            Manage all system notifications
          </p>

        </div>

      </div>

      {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

        </div>

      ) : (

        <div className="card border-0 shadow">

          <div className="card-body p-0">

                        {notifications.length === 0 ? (

              <div className="text-center py-5">

                <FaBell
                  size={60}
                  className="text-secondary mb-3"
                />

                <h5>No Notifications Found</h5>

                <p className="text-muted">
                  You're all caught up.
                </p>

              </div>

            ) : (

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>

                      <th>Title</th>

                      <th>Message</th>

                      <th>Status</th>

                      <th>Date</th>

                      <th className="text-center">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {notifications.map((notification) => (

                      <tr key={notification._id}>

                        <td className="fw-semibold">
                          {notification.title}
                        </td>

                        <td>
                          {notification.message}
                        </td>

                        <td>

                          {notification.isRead ? (

                            <span className="badge bg-success">
                              Read
                            </span>

                          ) : (

                            <span className="badge bg-warning text-dark">
                              Unread
                            </span>

                          )}

                        </td>

                        <td>
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="text-center">

                          {!notification.isRead && (

                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() =>
                                markAsRead(notification._id)
                              }
                            >
                              <FaCheckCircle />
                            </button>

                          )}

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteItem(notification._id)
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

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default Notifications;
          