import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";

import { registerUser } from "../api/authApi";



const Register = () => {


  const navigate = useNavigate();



  const [form, setForm] = useState({

    name:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:""

  });



  const [loading,setLoading]=useState(false);




  const changeHandler = (e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };





  const submitHandler = async(e)=>{


    e.preventDefault();



    if(form.password !== form.confirmPassword){

      alert(
        "Password and Confirm Password do not match"
      );

      return;

    }




    try{


      setLoading(true);



      const {data}=await registerUser({

        name:form.name,

        email:form.email,

        phone:form.phone,

        password:form.password

      });




      console.log(
        "REGISTER RESPONSE",
        data
      );




      if(data.success){


        localStorage.setItem(
          "token",
          data.token
        );



        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );



        alert(
          "Registration Successful"
        );



        navigate("/");


      }



    }
    catch(error){


      console.log(
        error.response?.data
      );



      alert(

        error.response?.data?.message ||
        "Registration Failed"

      );


    }
    finally{

      setLoading(false);

    }



  };





return (

<div
className="container-fluid"
style={{
minHeight:"100vh",
background:
"linear-gradient(135deg,#2563eb,#7c3aed)"
}}
>


<div className="row justify-content-center align-items-center min-vh-100">


<div className="col-lg-6 col-md-8">


<div
className="card border-0 shadow-lg"
style={{
borderRadius:"25px"
}}
>


<div className="card-body p-5">


<div className="text-center mb-4">

<h2 className="fw-bold">
Create Account
</h2>


<p className="text-muted">
Join Nandini Shop Today
</p>


</div>




<form onSubmit={submitHandler}>


<div className="row">


<div className="col-md-6 mb-3">


<label className="form-label">
Full Name
</label>


<div className="input-group">


<span className="input-group-text">
<FaUser/>
</span>


<input

className="form-control"

name="name"

placeholder="Enter Name"

value={form.name}

required

onChange={changeHandler}

/>


</div>


</div>





<div className="col-md-6 mb-3">


<label className="form-label">
Mobile
</label>



<div className="input-group">


<span className="input-group-text">
<FaPhone/>
</span>



<input

className="form-control"

name="phone"

placeholder="Enter Mobile"

value={form.phone}

onChange={changeHandler}

/>


</div>


</div>


</div>






<div className="mb-3">


<label className="form-label">
Email
</label>


<div className="input-group">


<span className="input-group-text">
<FaEnvelope/>
</span>


<input

type="email"

className="form-control"

name="email"

placeholder="Enter Email"

value={form.email}

required

onChange={changeHandler}

/>


</div>


</div>







<div className="row">


<div className="col-md-6 mb-3">


<label className="form-label">
Password
</label>


<div className="input-group">


<span className="input-group-text">
<FaLock/>
</span>



<input

type="password"

className="form-control"

name="password"

placeholder="Password"

value={form.password}

required

onChange={changeHandler}

/>


</div>


</div>







<div className="col-md-6 mb-4">


<label className="form-label">
Confirm Password
</label>


<div className="input-group">


<span className="input-group-text">
<FaLock/>
</span>



<input

type="password"

className="form-control"

name="confirmPassword"

placeholder="Confirm Password"

value={form.confirmPassword}

required

onChange={changeHandler}

/>


</div>


</div>


</div>







<button

className="btn btn-primary w-100 py-3"

disabled={loading}

>


<FaUserPlus className="me-2"/>


{
loading
?
"Creating Account..."
:
"Create Account"
}


</button>




</form>






<hr/>


<div className="text-center">


Already have an account?


<Link
to="/login"
className="ms-2 fw-bold text-decoration-none"
>

Login

</Link>


</div>



</div>


</div>


</div>


</div>


</div>


);


};


export default Register;