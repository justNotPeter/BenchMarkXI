import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";

function LogInPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4001/log-in",
        {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const token = response.data.token;
      console.log("JWT Token from response:", token);

      // Accessing jwt token from the cookie after login (disabled if httpOnly in cookie from server is set to true)
    //   const jwtToken = Cookies.get("token");
    //   console.log("JWT Token from cookies:", jwtToken);

      navigate("/");
      console.log("Log-in successful");
    } catch (error) {
      console.error(
        "Error during log-in:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sign-up-form-container bg-white rounded-md shadow-lg w-full sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[600px] h-auto">
        <div className="bg-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 p-4">
            Sign Up for BenchMarkXI
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Username or Email */}
          <div>
            <label htmlFor="usernameOrEmail" className="block text-black mb-2">
              Username or email address
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-black mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Log In Button and Forgot Password */}
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="w-20 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Log In
            </button>
            <p className="text-blue-500 cursor-pointer hover:border-b-[1px] hover:border-blue-500">
              Forgot your password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
