import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", scrollHandler);

    return () =>
      window.removeEventListener("scroll", scrollHandler);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={scrollTop}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;