const ProductFilter = ({
  categories,
  brands,
  onCategory,
  onBrand,
}) => {
  return (
    <div className="card p-3">

      <h5>Categories</h5>

      {categories.map((c) => (
        <button
          key={c._id}
          className="btn btn-light mb-2"
          onClick={() => onCategory(c._id)}
        >
          {c.name}
        </button>
      ))}

      <hr />

      <h5>Brands</h5>

      {brands.map((b) => (
        <button
          key={b._id}
          className="btn btn-light mb-2"
          onClick={() => onBrand(b._id)}
        >
          {b.name}
        </button>
      ))}

    </div>
  );
};

export default ProductFilter;