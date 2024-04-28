"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [allProduct , setAllProduct] = useState([]);
  const [loading , setLoading ] = useState(false);
  const [selectedProductToUpdate , setSelectedProductToUpdate] = useState(null)

  const fetchAllProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://localhost:3000/api/all-product`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      setAllProduct(responseData?.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching of all product:", error);
    }
  }

  useEffect(()=>{
    fetchAllProduct();
  },[])

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsLoggedIn(true);
      const userdata = JSON.parse(localStorage.getItem("user")) || {};
      setUserInfo(userdata);
    } else {
      setIsLoggedIn(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, selectedProductToUpdate ,setSelectedProductToUpdate, setIsLoggedIn,loading, userInfo, setUserInfo,allProduct }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
