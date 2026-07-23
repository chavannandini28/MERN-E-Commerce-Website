import axios from "axios";


// Backend URL
const API_URL = "http://localhost:5000/api/wishlist";



// ======================================
// Get My Wishlist
// GET /api/wishlist
// ======================================

export const getMyWishlist = async () => {

  const token = localStorage.getItem("token");


  return await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

};


// Compatibility name
export const getWishlist = getMyWishlist;





// ======================================
// Add Product To Wishlist
// POST /api/wishlist/add
// ======================================

export const addToWishlist = async (productId) => {

  const token = localStorage.getItem("token");


  return await axios.post(

    `${API_URL}/add`,

    {
      productId: productId,
    },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

};






// ======================================
// Remove Product From Wishlist
// DELETE /api/wishlist/remove/:id
// ======================================

export const removeFromWishlist = async (productId) => {

  const token = localStorage.getItem("token");


  return await axios.delete(

    `${API_URL}/remove/${productId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

};






// ======================================
// Clear Wishlist
// DELETE /api/wishlist/clear
// ======================================

export const clearWishlist = async () => {

  const token = localStorage.getItem("token");


  return await axios.delete(

    `${API_URL}/clear`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

};






// ======================================
// Get Wishlist Count
// GET /api/wishlist/count
// ======================================

export const getWishlistCount = async () => {

  const token = localStorage.getItem("token");


  return await axios.get(

    `${API_URL}/count`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  );

};