import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section
        className="bg-dark text-white text-center p-5 rounded"
      >
        <h1>Welcome To MERN Shop</h1>

        <p>
          Buy Everything At One Place
        </p>

        <Link
          className="btn btn-warning"
          to="/shop"
        >
          Shop Now
        </Link>
      </section>
    </>
  );
};

export default Home;