import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <form
      className="d-flex mx-3"
      onSubmit={submitHandler}
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <div className="input-group">

        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          <FaSearch />
        </button>

      </div>
    </form>
  );
};

export default SearchBar;