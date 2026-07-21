const WishlistItem = ({
  item,
  remove,
}) => {
  return (
    <div className="card shadow-sm">

      <img
        src={item.product.images?.[0]?.url}
        className="card-img-top"
        alt={item.product.name}
      />

      <div className="card-body">

        <h5>{item.product.name}</h5>

        <h4 className="text-success">
          ₹{item.product.price}
        </h4>

        <button
          className="btn btn-danger w-100"
          onClick={() => remove(item._id)}
        >
          Remove
        </button>

      </div>

    </div>
  );
};

export default WishlistItem;