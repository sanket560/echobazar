"use client";
import React, { useContext, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { setIsLoggedIn, setUserInfo,isLoggedIn } =
    useContext(GlobalContext);

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
      const response = await fetch("/api/login", {
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
          email: "",
          password: "",
        });
        router.push('/')
        // console.log(data.data.user);
          setIsLoggedIn(true);
          setUserInfo(data?.data?.user);
          Cookies.set('token', data?.data?.token);
          localStorage.setItem('user', JSON.stringify(data?.data?.user));
      } else {
        toast.error(data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(isAuthUser,userInfo);

  const isValidForm = () => {
    return user &&
      user.email &&
      user.email.trim() !== "" &&
      user &&
      user.password &&
      user.password.trim() !== ""
      ? true
      : false;
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <FiUser className="text-xl" />
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInput}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInput}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
            <a
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                defaultChecked
              />
              <label
                htmlFor="remember"
                className="ml-2 text-gray-700 text-sm font-semibold"
              >
                Remember me
              </label>
            </div>
            <Link href="/register">
              <p className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Account
              </p>
            </Link>
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
