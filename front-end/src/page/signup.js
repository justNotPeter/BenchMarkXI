import React, { useState } from "react";
import axios from "axios"; 

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4001/sign-up", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Sign-up successful");

    } catch (error) {
      if (error.response) {
        console.error("Error during sign-up:", error.response.data);
      } else {
        console.error("Error during sign-up:", error.message);
      }
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
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-black mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-black mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <p>
              By signing up you agree to the Terms of Use and Privacy Policy.
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
