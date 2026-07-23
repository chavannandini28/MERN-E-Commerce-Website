import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";


import {
  getMyWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../api/wishlistApi";



// ===============================
// Fetch Wishlist
// ===============================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async(_,thunkAPI)=>{

    try{

      const {data}=await getMyWishlist();


      return data.wishlist?.products || [];


    }
    catch(error){

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Wishlist loading failed"
      );

    }

  }
);





// ===============================
// Add Wishlist Item
// ===============================

export const addItemToWishlist = createAsyncThunk(
  "wishlist/addItem",
  async(productId,thunkAPI)=>{

    try{

      const {data}=await addToWishlist(productId);


      return data.wishlist.products;


    }
    catch(error){

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Add wishlist failed"
      );

    }

  }
);





// ===============================
// Remove Wishlist Item
// ===============================

export const removeWishlistItem=createAsyncThunk(

  "wishlist/removeItem",

  async(productId,thunkAPI)=>{

    try{

      await removeFromWishlist(productId);


      return productId;


    }
    catch(error){

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Remove failed"
      );

    }

  }

);






// ===============================
// Clear Wishlist
// ===============================

export const clearUserWishlist=createAsyncThunk(

  "wishlist/clear",

  async(_,thunkAPI)=>{

    try{

      await clearWishlist();

      return true;

    }
    catch(error){

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Clear failed"
      );

    }

  }

);






const initialState={

  wishlist:[],

  loading:false,

  error:null

};






const wishlistSlice=createSlice({

  name:"wishlist",

  initialState,


  reducers:{},


  extraReducers:(builder)=>{


    builder


    // Fetch

    .addCase(fetchWishlist.pending,(state)=>{

      state.loading=true;

    })


    .addCase(fetchWishlist.fulfilled,(state,action)=>{

      state.loading=false;

      state.wishlist=action.payload;

    })



    .addCase(fetchWishlist.rejected,(state,action)=>{

      state.loading=false;

      state.error=action.payload;

    })





    // Add

    .addCase(addItemToWishlist.fulfilled,(state,action)=>{


      state.wishlist=action.payload;


    })





    // Remove

    .addCase(removeWishlistItem.fulfilled,(state,action)=>{


      state.wishlist =
      state.wishlist.filter(
        item =>
        item.product._id !== action.payload
      );


    })






    // Clear

    .addCase(clearUserWishlist.fulfilled,(state)=>{

      state.wishlist=[];

    });



  }

});


export default wishlistSlice.reducer;