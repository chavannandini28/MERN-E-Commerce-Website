import { useEffect, useState } from "react";
import {
  getWishlist,
  removeWishlist,
} from "../api/wishlistApi";
import WishlistItem from "../components/WishlistItem";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    try {
      const { data } = await getWishlist();
      setItems(data.wishlist || []);
    } catch {
      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const remove = async (id) => {
    await removeWishlist(id);
    toast.success("Removed from wishlist");
    loadWishlist();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Wishlist</h2>

      <div className="row">
        {items.length === 0 ? (
          <h4>Your wishlist is empty.</h4>
        ) : (
          items.map((item) => (
            <div
              className="col-md-4 mb-4"
              key={item._id}
            >
              <WishlistItem
                item={item}
                remove={remove}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;