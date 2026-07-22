import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

import { loginUser } from "../api/authApi";


const Login = () => {


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);



const submitHandler = async(e)=>{


e.preventDefault();



try{


setLoading(true);



const {data}=await loginUser({

email,
password

});



console.log(
"LOGIN RESPONSE",
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
"Login Successful"
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
"Login Failed"

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
"linear-gradient(135deg,#0d6efd,#6f42c1)"
}}
>


<div className="row justify-content-center align-items-center min-vh-100">


<div className="col-lg-5 col-md-7">


<div
className="card border-0 shadow-lg"
style={{
borderRadius:"25px"
}}
>


<div className="card-body p-5">


<div className="text-center mb-4">

<h2 className="fw-bold">
Welcome Back 👋
</h2>

<p className="text-muted">
Login to your account
</p>


</div>




<form onSubmit={submitHandler}>


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

placeholder="Enter Email"

value={email}

required

onChange={(e)=>
setEmail(e.target.value)
}

/>


</div>


</div>





<div className="mb-4">


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

placeholder="Enter Password"

value={password}

required

onChange={(e)=>
setPassword(e.target.value)
}

/>


</div>


</div>





<button

className="btn btn-primary w-100 py-3"

disabled={loading}

>


<FaSignInAlt className="me-2"/>


{
loading?
"Logging in..."
:
"Login"
}


</button>


</form>




<hr/>

<div className="text-center">


Don't have an account?


<Link
to="/register"
className="ms-2 fw-bold text-decoration-none"
>

Register

</Link>


</div>



</div>


</div>


</div>


</div>


</div>


);


};


export default Login;