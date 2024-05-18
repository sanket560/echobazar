"use client";
import { getAllCartItems } from "@/controller/cart";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProductToUpdate, setSelectedProductToUpdate] = useState(null);
  const [userCartData, setUserCartData] = useState([]);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);

  // fetch all product
  const fetchAllProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${FRONTEND_BASE_URL}api/all-product`, {
        method: "GET",
      });
      const responseData = await response.json();
      setAllProduct(responseData?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching of all product:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // fetch user cart data
  async function extractGetAllCartItems() {
    if (userInfo && userInfo._id) {
      const res = await getAllCartItems(userInfo._id);
      setUserCartData(res.data);
    }
  }

  useEffect(() => {
    if (userInfo && userInfo._id) {
      extractGetAllCartItems();
    }
  }, [userInfo]);

  // Calculate total items in the cart
  useEffect(() => {
    const totalItems = userCartData.length;
    setTotalItemsInCart(totalItems);
  }, [userCartData]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsLoggedIn(true);
      const userdata = JSON.parse(localStorage.getItem("user")) || {};
      setUserInfo(userdata);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        selectedProductToUpdate,
        setSelectedProductToUpdate,
        setIsLoggedIn,
        loading,
        userInfo,
        setUserInfo,
        allProduct,
        setUserCartData,
        userCartData,
        extractGetAllCartItems,
        totalItemsInCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
