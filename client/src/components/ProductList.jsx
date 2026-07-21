import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="row">

      {products.map((product) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 mb-4"
          key={product._id}
        >
          <ProductCard product={product} />
        </div>
      ))}

    </div>
  );
};

export default ProductList;