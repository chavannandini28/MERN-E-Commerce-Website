import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">

        <div className="row align-items-center">

          {/* Left */}

          <div className="col-lg-6">

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <span className="hero-badge">
                🔥 Biggest Sale of the Year
              </span>

              <h1 className="hero-title">
                Discover The Latest
                <br />
                Fashion Collection
              </h1>

              <p className="hero-text">
                Shop thousands of premium products at unbeatable
                prices with fast delivery and secure payments.
              </p>

              <div className="hero-buttons">

                <Link to="/shop" className="btn btn-primary btn-lg">
                  Shop Now
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-dark btn-lg"
                >
                  Join Now
                </Link>

              </div>

            </motion.div>

          </div>

          {/* Right */}

          <div className="col-lg-6">

            <motion.img
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
              alt="Hero"
              className="img-fluid hero-image"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;