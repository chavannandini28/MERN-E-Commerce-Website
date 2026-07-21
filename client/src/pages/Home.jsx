import { Link } from "react-router-dom";
import {
  FaShippingFast,
  FaHeadset,
  FaUndo,
  FaLock,
} from "react-icons/fa";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="container-fluid text-white py-5"
        style={{
          background:
            "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6">

              <span className="badge bg-warning text-dark fs-6 mb-3">
                🔥 Big Sale 50% OFF
              </span>

              <h1 className="display-3 fw-bold">
                Upgrade Your Lifestyle
              </h1>

              <p className="lead my-4">
                Shop the latest fashion, electronics,
                accessories and more at the best prices.
              </p>

              <div className="d-flex gap-3">

                <Link
                  to="/shop"
                  className="btn btn-warning btn-lg px-4"
                >
                  Shop Now
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Register
                </Link>

              </div>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                alt="Hero"
                className="img-fluid rounded-4 shadow-lg"
              />

            </div>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="container py-5">

        <div className="row text-center g-4">

          <div className="col-md-3">

            <div className="card border-0 shadow-sm h-100 p-4">

              <FaShippingFast
                className="text-primary mx-auto mb-3"
                size={45}
              />

              <h5>Free Shipping</h5>

              <p className="text-muted">
                Free delivery on every order.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm h-100 p-4">

              <FaLock
                className="text-success mx-auto mb-3"
                size={45}
              />

              <h5>Secure Payment</h5>

              <p className="text-muted">
                100% secure online payment.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm h-100 p-4">

              <FaUndo
                className="text-warning mx-auto mb-3"
                size={45}
              />

              <h5>Easy Returns</h5>

              <p className="text-muted">
                7 Days return policy.
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card border-0 shadow-sm h-100 p-4">

              <FaHeadset
                className="text-danger mx-auto mb-3"
                size={45}
              />

              <h5>24×7 Support</h5>

              <p className="text-muted">
                We are always here to help.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="container py-5">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Shop By Category</h2>
          <p className="text-muted">
            Explore our popular categories
          </p>
        </div>

        <div className="row g-4">

          {[
            "Electronics",
            "Fashion",
            "Shoes",
            "Accessories",
          ].map((item) => (
            <div className="col-lg-3 col-md-6" key={item}>
              <div className="card border-0 shadow category-card text-center p-4">

                <img
                  src={`https://picsum.photos/300/200?random=${item}`}
                  className="card-img-top rounded"
                  alt={item}
                />

                <div className="card-body">

                  <h5>{item}</h5>

                  <Link
                    to="/shop"
                    className="btn btn-outline-primary"
                  >
                    Explore
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-primary text-white py-5">

        <div className="container text-center">

          <h2 className="fw-bold">
            Ready To Start Shopping?
          </h2>

          <p className="lead">
            Thousands of premium products are waiting.
          </p>

          <Link
            to="/shop"
            className="btn btn-warning btn-lg px-5"
          >
            Explore Store
          </Link>

        </div>

      </section>
    </>
  );
};

export default Home;