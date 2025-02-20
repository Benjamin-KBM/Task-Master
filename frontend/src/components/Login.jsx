import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import bg from "../assets/gradient.jpg";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // ------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // ------------------------------------------------------------------------
  const navigate = useNavigate();
  // ------------------------------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Invalid email or password");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const {
        success,
        message,
        jwtToken,
        name: firstName,
        email: email,
        error,
      } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("user", firstName);
        localStorage.setItem("mail address", email);
        setTimeout(() => {
          navigate("/home");
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

  // ----------------------------------------------------------------------

  return (
    <div
      className="fixed inset-0 text-center bg-opacity-45 backdrop-blur-sm flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div>
        <form
          className="bg-emerald/30 backdrop-brightness-50 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight pb-6">
            Login
          </h2>
          <div className="mb-4">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="@"
              required
              type="email"
              onChange={handleChange}
              value={loginInfo.email}
            />

            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="form-control appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="*******"
              type="Password"
              required
              onChange={handleChange}
              value={loginInfo.password}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <p className="font-medium text-white text-sm p-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-red-500 cursor-pointer"
            >
              Sign Up.
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
