import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    Emailid: "",
    Password: ""
  });

  const { Emailid, Password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4321/register/login", inputValue, { withCredentials: true });
      const { success, message } = response.data;
      if (success) {
        toast.success(message, { position: "bottom-left" });
        //alert("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(message, { position: "bottom-left" });
        //alert(message);
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, { position: "bottom-left" });
      //alert(errorMessage);
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Emailid">Email ID</label>
          <input
            type="email"
            name="Emailid"
            value={Emailid}
            required
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="Password"
            value={Password}
            required
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Create a new account . . . ! <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
