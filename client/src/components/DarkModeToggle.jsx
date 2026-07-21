import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="btn btn-light rounded-circle ms-2"
      onClick={() => setDark(!dark)}
      title="Toggle Theme"
    >
      {dark ? (
        <FaSun className="text-warning" />
      ) : (
        <FaMoon />
      )}
    </button>
  );
};

export default DarkModeToggle;