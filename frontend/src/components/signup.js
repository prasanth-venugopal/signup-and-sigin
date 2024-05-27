import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    FName: "",
    LName: "",
    Emailid: "",
    Password: "",
  });
  const { LName, FName, Emailid, Password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left",
    });
    //alert(err);
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
    //alert(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4321/register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred during registration.");
    }
    setInputValue({
      FName: "",
      LName: "",
      Emailid: "",
      Password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="FName">First Name</label>
          <input
            type="text"
            name="FName"
            value={FName}
            required
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="LName">Last Name</label>
          <input
            type="text"
            name="LName"
            value={LName}
            required
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="Emailid">Emailid</label>
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
          Already have an account . . . ? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
