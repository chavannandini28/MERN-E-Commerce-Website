const SearchBar = ({
  keyword,
  setKeyword,
}) => {
  return (
    <input
      className="form-control mb-4"
      placeholder="Search Products..."
      value={keyword}
      onChange={(e) =>
        setKeyword(e.target.value)
      }
    />
  );
};

export default SearchBar;