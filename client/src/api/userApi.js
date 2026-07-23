import axios from "axios";


const API_URL = "http://localhost:5000/api/users";



// Get All Users (Admin)
export const getAllUsers = async () => {

  const token = localStorage.getItem("token");


  return await axios.get(
    API_URL,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

};




// Get Single User
export const getUserById = async(id)=>{

  const token = localStorage.getItem("token");


  return await axios.get(
    `${API_URL}/${id}`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

};




// Update User
export const updateUser = async(id,data)=>{


  const token = localStorage.getItem("token");


  return await axios.put(

    `${API_URL}/${id}`,

    data,

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );

};




// Delete User
export const deleteUser = async(id)=>{


  const token = localStorage.getItem("token");


  return await axios.delete(

    `${API_URL}/${id}`,

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );

};




// Update User Role
export const updateUserRole = async(id,data)=>{


  const token = localStorage.getItem("token");


  return await axios.patch(

    `${API_URL}/role/${id}`,

    data,

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );

};




// Block User
export const blockUser = async(id)=>{


  const token = localStorage.getItem("token");


  return await axios.patch(

    `${API_URL}/block/${id}`,

    {},

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );

};




// Unblock User
export const unblockUser = async(id)=>{


  const token = localStorage.getItem("token");


  return await axios.patch(

    `${API_URL}/unblock/${id}`,

    {},

    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

  );

};

// Alias for AdminDashboard
export const getUsers = async () => {

  const token = localStorage.getItem("token");

  return await axios.get(
    API_URL,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

};