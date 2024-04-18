"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiUser } from "react-icons/fi";

const Register = () => {
  // State variables for user details
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setUser({
          name: "",
          email: "",
          password: "",
          role: "Customer",
        })
        router.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidForm = () => {
    return user &&
      user.name &&
      user.name.trim() !== "" &&
      user &&
      user.email &&
      user.email.trim() !== "" &&
      user &&
      user.password &&
      user.password.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="bg-white relative">
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[600px]">
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-gray-200 rounded-full p-3">
              <FiUser className="text-xl" />
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create a new account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your details to register.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-around md:flex-row ">
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                  className="shadow-sm rounded-md w-full md:w-60 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required=""
                  placeholder="James Brown"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="shadow-sm rounded-md w-full md:w-60 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required=""
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="flex flex-col justify-around md:flex-row ">
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Select Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleInput}
                  className="shadow-sm rounded-md w-full md:w-60 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Seller">Seller</option>
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className="shadow-sm rounded-md w-full md:w-60 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required=""
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValidForm() || isLoading}
              className={`disabled:opacity-50 w-full rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              By clicking Register, you agree to accept EchoBazar
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
