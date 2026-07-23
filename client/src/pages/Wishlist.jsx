import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

import {
  addToCart,
} from "../api/cartApi";



const Wishlist = () => {


  const [wishlist,setWishlist] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    fetchWishlist();

  },[]);





  const fetchWishlist = async()=>{

    try{


      const res = await getWishlist();


      // IMPORTANT FIX
      setWishlist(
        res.data.wishlist?.products || []
      );


    }
    catch(error){

      toast.error(
        "Failed to load wishlist"
      );

    }
    finally{

      setLoading(false);

    }

  };






  const removeItem = async(productId)=>{


    try{


      await removeFromWishlist(productId);


      toast.success(
        "Removed from wishlist"
      );


      fetchWishlist();


    }
    catch(error){

      toast.error(
        "Remove failed"
      );

    }

  };







  const addItemToCart = async(productId)=>{


    try{


      await addToCart({

        productId,

        quantity:1

      });



      toast.success(
        "Added to cart"
      );


    }
    catch(error){


      toast.error(
        "Add to cart failed"
      );


    }


  };







  if(loading){

    return (

      <div className="text-center mt-5">

        Loading...

      </div>

    );

  }







  return (

    <div className="container py-4">


      <div className="d-flex justify-content-between mb-4">


        <h2>

          <FaHeart className="text-danger me-2"/>

          My Wishlist

        </h2>



        <Link
          to="/products"
          className="btn btn-primary"
        >

          Continue Shopping

        </Link>


      </div>





      {
        wishlist.length === 0 ?


        (

          <div className="text-center">

            <h4>
              No Wishlist Items
            </h4>


          </div>


        )


        :


        (

        <table className="table table-bordered align-middle">


          <thead>

            <tr>

              <th>
                Image
              </th>

              <th>
                Name
              </th>

              <th>
                Price
              </th>

              <th>
                Stock
              </th>

              <th>
                Action
              </th>

            </tr>


          </thead>





          <tbody>


          {
            wishlist.map((item)=>{


              const product =
              item.product || {};



              return (

              <tr
                key={product._id}
              >



                <td>

                  <img

                    src={
                      product.thumbnail?.url ||
                      product.image ||
                      "/no-image.png"
                    }

                    alt={product.title}

                    width="70"

                  />

                </td>




                <td>

                  {product.title}

                </td>




                <td>

                  ₹{product.price}

                </td>




                <td>

                  {
                    product.stock > 0
                    ?
                    "In Stock"
                    :
                    "Out of Stock"
                  }

                </td>




                <td>


                  <button

                    className="btn btn-success btn-sm me-2"

                    onClick={()=>
                      addItemToCart(product._id)
                    }

                  >

                    <FaShoppingCart/>

                  </button>




                  <button

                    className="btn btn-danger btn-sm"

                    onClick={()=>
                      removeItem(product._id)
                    }

                  >

                    <FaTrash/>

                  </button>


                </td>



              </tr>

              );


            })
          }



          </tbody>


        </table>

        )

      }



    </div>

  );

};



export default Wishlist;