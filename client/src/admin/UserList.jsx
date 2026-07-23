import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaUserShield,
} from "react-icons/fa";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../api/userApi";


const UserList = () => {


  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);



  // Fetch Users
  const fetchUsers = async()=>{

    try{

      setLoading(true);

      const res = await getAllUsers();

      setUsers(res.data.users || []);

    }
    catch(error){

      toast.error(
        error.response?.data?.message ||
        "Failed to load users"
      );

    }
    finally{

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchUsers();

  },[]);





  // Delete User
  const handleDelete = async(id)=>{

    try{

      await deleteUser(id);

      toast.success(
        "User deleted successfully"
      );

      fetchUsers();

    }
    catch(error){

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };





  // Change Role
  const handleRoleChange = async(id,role)=>{


    try{

      await updateUserRole(id,{role});


      toast.success(
        "Role updated"
      );


      fetchUsers();

    }
    catch(error){

      toast.error(
        "Role update failed"
      );

    }

  };






  if(loading){

    return (
      <div className="text-center mt-5">
        Loading Users...
      </div>
    );

  }






  return (

    <div className="container mt-4">


      <h2 className="mb-4">
        User Management
      </h2>



      <div className="table-responsive">

        <table className="table table-bordered table-hover">


          <thead className="table-dark">

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Role</th>

              <th>Action</th>

            </tr>

          </thead>



          <tbody>


          {
            users.length === 0 ?

            (
              <tr>

                <td
                 colSpan="5"
                 className="text-center"
                >
                  No Users Found
                </td>

              </tr>
            )


            :

            users.map((user)=>(

              <tr key={user._id}>


                <td>
                  {user.name}
                </td>


                <td>
                  {user.email}
                </td>


                <td>
                  {user.phone || "-"}
                </td>


                <td>


                  <select
                    className="form-select"
                    value={user.role}
                    onChange={(e)=>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="User">
                      User
                    </option>


                    <option value="Admin">
                      Admin
                    </option>


                  </select>


                </td>



                <td>


                  <button
                    className="btn btn-danger"
                    onClick={()=>
                      handleDelete(user._id)
                    }
                  >

                    <FaTrash/>

                  </button>


                </td>


              </tr>


            ))

          }



          </tbody>


        </table>


      </div>


    </div>

  );

};



export default UserList;