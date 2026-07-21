import { useState } from "react";
import {
  FaBell,
  FaShoppingCart,
  FaHeart,
  FaCheckCircle,
  FaGift,
} from "react-icons/fa";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      icon: <FaShoppingCart className="text-primary" />,
      title: "Your order has been shipped",
      time: "5 min ago",
    },
    {
      id: 2,
      icon: <FaHeart className="text-danger" />,
      title: "Wishlist item price dropped",
      time: "20 min ago",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-success" />,
      title: "Payment Successful",
      time: "1 hour ago",
    },
    {
      id: 4,
      icon: <FaGift className="text-warning" />,
      title: "Special Offer: 30% OFF",
      time: "Today",
    },
  ];

  return (
    <div className="position-relative">

      <button
        className="btn btn-light rounded-circle position-relative"
        onClick={() => setOpen(!open)}
      >
        <FaBell />

        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {notifications.length}
        </span>
      </button>

      {open && (
        <div
          className="card shadow border-0 position-absolute end-0 mt-2"
          style={{
            width: "340px",
            zIndex: 9999,
            borderRadius: "15px",
          }}
        >

          <div className="card-header bg-white">

            <h5 className="mb-0 fw-bold">
              Notifications
            </h5>

          </div>

          <div
            className="card-body p-0"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >

            {notifications.map((item) => (

              <div
                key={item.id}
                className="d-flex align-items-start p-3 border-bottom"
              >

                <div
                  className="me-3 fs-4"
                >
                  {item.icon}
                </div>

                <div>

                  <h6 className="mb-1">
                    {item.title}
                  </h6>

                  <small className="text-muted">
                    {item.time}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default NotificationDropdown;