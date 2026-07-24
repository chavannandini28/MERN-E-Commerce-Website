import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";


const Footer = () => {

  return (

    <footer
      className="text-light mt-5"
      style={{
        background:"#0f172a"
      }}
    >


      <div className="container py-5">


        <div className="row">



          {/* Company */}

          <div className="col-lg-4 col-md-6 mb-4">


            <h3 className="fw-bold text-warning">
              NANDINI SHOP
            </h3>



            <p className="text-light mt-3">

              India's modern online shopping platform.
              Buy electronics, fashion, groceries and
              much more at the best prices.

            </p>



            <div className="d-flex gap-3 mt-4">


              {/* Facebook */}

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-circle"
              >
                <FaFacebookF/>
              </a>




              {/* Instagram */}

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-danger rounded-circle"
              >
                <FaInstagram/>
              </a>





              {/* Twitter */}

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-info rounded-circle"
              >
                <FaTwitter/>
              </a>





              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/nandini-chavan-b4788727b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-circle"
              >
                <FaLinkedinIn/>
              </a>





              {/* GitHub */}

              <a
                href="https://github.com/chavannandini28"
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark rounded-circle"
              >
                <FaGithub/>
              </a>



            </div>



          </div>






          {/* Quick Links */}


          <div className="col-lg-2 col-md-6 mb-4">


            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>



            <ul className="list-unstyled">


              <li className="mb-2">

                <Link
                  to="/"
                  className="text-light text-decoration-none"
                >
                  Home
                </Link>

              </li>



              <li className="mb-2">

                <Link
                  to="/shop"
                  className="text-light text-decoration-none"
                >
                  Shop
                </Link>

              </li>




              <li className="mb-2">

                <Link
                  to="/cart"
                  className="text-light text-decoration-none"
                >
                  Cart
                </Link>

              </li>




              <li className="mb-2">

                <Link
                  to="/wishlist"
                  className="text-light text-decoration-none"
                >
                  Wishlist
                </Link>

              </li>





              <li>

                <Link
                  to="/profile"
                  className="text-light text-decoration-none"
                >
                  My Profile
                </Link>

              </li>



            </ul>


          </div>








          {/* Customer Support */}


          <div className="col-lg-3 col-md-6 mb-4">


            <h5 className="fw-bold mb-3">
              Customer Support
            </h5>



            <ul className="list-unstyled">


              <li className="mb-2">
                Help Center
              </li>


              <li className="mb-2">
                Return Policy
              </li>


              <li className="mb-2">
                Privacy Policy
              </li>


              <li className="mb-2">
                Terms & Conditions
              </li>


              <li>
                Shipping Policy
              </li>


            </ul>



          </div>









          {/* Contact */}


          <div className="col-lg-3 col-md-6">


            <h5 className="fw-bold mb-3">
              Contact
            </h5>



            <p>

              <FaMapMarkerAlt
                className="me-2 text-warning"
              />

              Pune, Maharashtra, India

            </p>




            <p>

              <FaPhoneAlt
                className="me-2 text-warning"
              />

              +91 7702561023

            </p>





            <p>

              <FaEnvelope
                className="me-2 text-warning"
              />

              support@nandinishop.com

            </p>



          </div>



        </div>



      </div>





      <hr className="m-0 text-secondary"/>





      <div className="text-center py-3">


        © {new Date().getFullYear()}
        {" "}
        Nandini SHOP

        {" | "}

        Designed with ❤️ by Nandini Chavan


      </div>





    </footer>


  );

};


export default Footer;