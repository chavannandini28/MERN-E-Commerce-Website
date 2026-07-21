const CartItem = ({
  item,
  increase,
  decrease,
  remove,
}) => {
  return (
    <div className="card mb-3 shadow-sm">

      <div className="row g-0">

        <div className="col-md-3">

          <img
            src={item.product.images?.[0]?.url}
            className="img-fluid rounded-start"
            alt={item.product.name}
          />

        </div>

        <div className="col-md-9">

          <div className="card-body">

            <h5>{item.product.name}</h5>

            <h4 className="text-success">
              ₹{item.product.price}
            </h4>

            <div className="d-flex align-items-center gap-2">

              <button
                className="btn btn-outline-secondary"
                onClick={() => decrease(item)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="btn btn-outline-secondary"
                onClick={() => increase(item)}
              >
                +
              </button>

            </div>

            <button
              className="btn btn-danger mt-3"
              onClick={() => remove(item._id)}
            >
              Remove
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartItem;