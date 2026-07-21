import {
  useEffect,
  useState,
} from "react";

import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

import {
  getProducts,
} from "../api/productApi";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [keyword, setKeyword] =
    useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } =
        await getProducts();

      setProducts(data.products);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered =
    products.filter((p) =>
      p.name
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
    );

  if (loading)
    return <Loader />;

  return (
    <div>

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <ProductList
        products={filtered}
      />

    </div>
  );
};

export default Shop;