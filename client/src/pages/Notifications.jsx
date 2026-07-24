import { useEffect, useState } from "react";
import {
  FaBell,
  FaTrash,
  FaCheck,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaGift,
  FaBullhorn,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../api/notificationApi";

const Notifications = () => {
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
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
          "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  const markReadHandler = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );

      toast.success("Marked as read");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update notification"
      );
    }
  };

  const deleteHandler = async (id) => {
    if (
      !window.confirm(
        "Delete this notification?"
      )
    )
      return;

    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      toast.success(
        "Notification deleted"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete notification"
      );
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "ORDER":
        return (
          <FaBox className="text-primary" />
        );

      case "SHIPPED":
        return (
          <FaTruck className="text-info" />
        );

      case "DELIVERED":
        return (
          <FaCheckCircle className="text-success" />
        );

      case "CANCELLED":
        return (
          <FaTimesCircle className="text-danger" />
        );

      case "OFFER":
        return (
          <FaGift className="text-warning" />
        );

      case "ANNOUNCEMENT":
        return (
          <FaBullhorn className="text-secondary" />
        );

      default:
        return (
          <FaBell className="text-primary" />
        );
    }
  };

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          <FaBell className="me-2" />
          Notifications
        </h2>

        <span className="badge bg-primary fs-6">

          {notifications.length}

        </span>

      </div>

            {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

        </div>

      ) : notifications.length === 0 ? (

        <div className="card shadow-sm border-0">

          <div className="card-body text-center py-5">

            <FaBell
              size={60}
              className="text-secondary mb-3"
            />

            <h4>No Notifications</h4>

            <p className="text-muted mb-0">
              You're all caught up.
            </p>

          </div>

        </div>

      ) : (

        <div className="row">

          {notifications.map((item) => (

            <div
              className="col-lg-6 mb-4"
              key={item._id}
            >

              <div
                className={`card shadow-sm border-0 h-100 ${
                  item.isRead
                    ? ""
                    : "border-start border-4 border-primary"
                }`}
              >

                <div className="card-body">

                  <div className="d-flex">

                    <div
                      className="me-3 fs-2"
                    >
                      {getIcon(item.type)}
                    </div>

                    <div className="flex-grow-1">

                      <div className="d-flex justify-content-between">

                        <h5 className="fw-bold mb-1">

                          {item.title}

                        </h5>

                        {!item.isRead && (

                          <span className="badge bg-danger">

                            New

                          </span>

                        )}

                      </div>

                      <p className="text-muted mb-2">

                        {item.message}

                      </p>

                      <small className="text-secondary">

                        {new Date(
                          item.createdAt
                        ).toLocaleString()}

                      </small>

                    </div>

                  </div>

                  <hr />

                  <div className="d-flex gap-2">

                    {!item.isRead && (

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          markReadHandler(item._id)
                        }
                      >
                        <FaCheck className="me-1" />

                        Mark Read

                      </button>

                    )}

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        deleteHandler(item._id)
                      }
                    >
                      <FaTrash className="me-1" />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

          </div>
  );
};

export default Notifications;