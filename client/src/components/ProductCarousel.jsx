import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ProductCarousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);

  if (!images.length) {
    return (
      <img
        src="https://via.placeholder.com/600x600?text=No+Image"
        className="img-fluid rounded shadow"
        alt="No Product"
      />
    );
  }

  const nextImage = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="position-relative">

      <img
        src={images[current]?.url}
        alt=""
        className="img-fluid rounded shadow"
        style={{
          height: "500px",
          width: "100%",
          objectFit: "contain",
          background: "#fff",
          padding: "20px",
        }}
      />

      {images.length > 1 && (
        <>
          <button
            className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
            onClick={prevImage}
          >
            <FaChevronLeft />
          </button>

          <button
            className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
            onClick={nextImage}
          >
            <FaChevronRight />
          </button>
        </>
      )}

      <div className="d-flex justify-content-center mt-3 gap-2">

        {images.map((img, index) => (

          <img
            key={index}
            src={img.url}
            alt=""
            onClick={() => setCurrent(index)}
            className={`rounded border ${
              current === index
                ? "border-primary border-3"
                : ""
            }`}
            style={{
              width: "70px",
              height: "70px",
              cursor: "pointer",
              objectFit: "contain",
              padding: "5px",
              background: "#fff",
            }}
          />

        ))}

      </div>

    </div>
  );
};

export default ProductCarousel;