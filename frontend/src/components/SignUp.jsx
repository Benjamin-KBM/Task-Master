import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import bg from "../assets/gradient.jpg";

const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = signupInfo;
    if (!firstName || !lastName || !password || !email) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  // ------------------------------------------------------------------------
  const navigate = useNavigate();
  // ------------------------------------------------------------------------
  return (
    <div
      className="fixed inset-0 text-center bg-opacity-45 backdrop-blur-sm flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignup}
        className="bg-emerald/30 backdrop-brightness-50 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight pb-6">
          Register
        </h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              className="form-control appearance-none block w-full bg-gray-200 text-black-700  border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Whats your first name..."
              required
              type="text"
              onChange={handleChange}
              value={signupInfo.firstName}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              className="form-control appearance-none block w-full bg-gray-200 text-black-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Whats your Sir name..."
              required
              type="text"
              onChange={handleChange}
              value={signupInfo.lastName}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="eg: @gmail..."
              type="email"
              required
              onChange={handleChange}
              value={signupInfo.email}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="form-control appearance-none block w-full bg-gray-200 text-black-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="This needs to be at least 8 characters long..."
              required
              onChange={handleChange}
              value={signupInfo.password}
            />
          </div>
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign up
        </button>
        <p className="font-medium text-white text-md p-3">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-red-500 cursor-pointer">
            Login.
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
