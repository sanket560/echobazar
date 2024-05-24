"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../Images/logo.svg";
import { FiUser } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteFromCart, getAllCartItems } from "@/controller/cart";
import { MdDelete } from "react-icons/md";

const menuItemsOfDesktop = [
  {
    name: "Vivo",
    link: "/vivo",
  },
  {
    name: "Iphone",
    link: "/iphone",
  },
  {
    name: "Oppo",
    link: "/oppo",
  },
  {
    name: "Redmi",
    link: "/redmi",
  },
];

const menuItemsOfMobile = [
  {
    name: "Vivo",
    link: "/vivo",
  },
  {
    name: "Iphone",
    link: "/iphone",
  },
  {
    name: "Oppo",
    link: "/oppo",
  },
  {
    name: "Redmi",
    link: "/redmi",
  },
  {
    divider: true,
  },
  {
    name: "Admin Dashboard",
    link: "/admin",
  },
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "Wishlist",
    link: "/Wishlist",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartDropDown, setCartDropDown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
    extractGetAllCartItems,
    userCartData,
    setUserCartData,
    totalItemsInCart,
  } = useContext(GlobalContext);

  const navbarRef = useRef(null);
  const isAdminView = pathname.includes("admin");

  useEffect(() => {
    setDropdownIndex(null);
    setOpen(false);
    setIsMenuOpen(false);
    setCartDropDown(false);
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setDropdownIndex(null);
        setOpen(false);
        setIsMenuOpen(false);
        setCartDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (index) => {
    if (dropdownIndex === index) {
      setDropdownIndex(null);
    } else {
      setDropdownIndex(index);
    }
  };

  const handleListItemClick = (event, index) => {
    event.preventDefault();
    toggleDropdown(index);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(false);
    setUserCartData([]);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
    toast.success("Logout! See You Soon");
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  const totalPrice = userCartData?.reduce((total, cartItem) => {
    const itemTotalPrice = cartItem.discountPrice * cartItem.quantity;
    cartItem.totalPrice = itemTotalPrice;
    return total + itemTotalPrice;
  }, 0);

  async function deleteCartProduct(getId) {
    const res = await deleteFromCart(getId);
    extractGetAllCartItems();
    if (res.success) {
      toast.success("Product Removed From Cart");
    } else {
      toast.error("Failed to remove product");
    }
  }

  // console.log(userCartData)

  return (
    <div className="shadow-md w-full z-30 fixed top-0 left-0" ref={navbarRef}>
      <div className="flex items-center z-30 h-16 justify-between bg-white py-2 md:px-10 px-4">
        <div className="font-bold text-2xl cursor-pointer flex items-center justify-between gap-1">
          <Link href="/">
            <Image src={logo} width={150} alt="echobazar" />
          </Link>
        </div>
        {!isAdminView && (
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {menuItemsOfDesktop.map((item, index) => (
                <li
                  key={item.name}
                  onClick={(event) => handleListItemClick(event, index)}
                  className="relative"
                >
                  <Link
                    key={item.name}
                    href={item.link}
                    className="text-md font-medium hover:text-[#6366f1] text-gray-800 transition-all flex items-center gap-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isAdminView && (
          <div className="hidden md:block">
            <div className="flex items-center">
              <Link href={"/admin/all-product"}>
                <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                  Manage All Products
                </li>
              </Link>
              <Link href={"/admin/add-product"}>
                <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                  Add New Product
                </li>
              </Link>
              <Link href={"/"}>
                <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                  Client View
                </li>
              </Link>
            </div>
          </div>
        )}
        <div className="flex items-center">
          {!isAdminView && (
            <div className="relative hidden md:block mr-4">
              <MdOutlineShoppingCart
                onClick={() => setCartDropDown(!cartDropDown)}
                className="w-7 mx-4 text-gray-800 h-7 cursor-pointer"
              />
              <span className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {totalItemsInCart}
              </span>
            </div>
          )}

          {cartDropDown && (
            <ul
              className={`absolute hidden md:block z-10 w-min right-0 bg-white top-16 shadow-md py-2 rounded-b-md transition-all duration-300 ${cartDropDown ? "opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="relative w-screen max-w-sm px-4 pb-4 sm:px-6 lg:px-8">
                <div className="mt-2 space-y-6">
                  {(userCartData?.length ?? 0) > 0 ? (
                    <>
                      <ul>
                        {userCartData.map((cartItem, index) => (
                          <li
                            key={index}
                            className="flex py-3 border-b-2 md:w-[300px] items-center gap-4"
                          >
                            <Image
                              src={cartItem.productID.image}
                              alt={cartItem.productID.name}
                              width={300}
                              height={200}
                              className="size-16 rounded object-cover"
                            />
                            <div className="w-full">
                              <h3 className="text-sm text-gray-900">
                                {cartItem.productID.name}
                              </h3>
                              <div className="mt-0.5 w-full flex justify-between space-y-px text-gray-600">
                                <div className="w-full">
                                  <div className="flex text-sm items-center gap-2">
                                    <span>Price:</span>
                                    <span>
                                      {formatPrice(cartItem.discountPrice)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex text-sm items-center gap-2">
                                      <span>Quantity:</span>
                                      <span>{cartItem.quantity}</span>
                                    </div>
                                      <div className="flex text-sm items-center gap-2">
                                        <span>Total:</span>
                                        <span>
                                          {formatPrice(cartItem.totalPrice)}
                                        </span>
                                      </div>
                                    <button
                                      onClick={() =>
                                        deleteCartProduct(cartItem._id)
                                      }
                                    >
                                      <MdDelete className="text-red-400 text-xl" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-700">
                        Overall Total: {formatPrice(totalPrice)}
                      </p>

                      <div className="space-y-4 text-center">
                        <button
                          onClick={() => router.push("/checkout")}
                          className="block rounded bg-indigo-500 w-full px-5 py-3 text-sm text-white transition hover:bg-indigo-400"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                </div>
              </div>
            </ul>
          )}

          {isLoggedIn ? (
            <>
              <FiUser
                className="w-7 hidden md:block h-7 cursor-pointer mx-2 md:mx-3"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <ul
                  className={`absolute z-10 w-48 right-4 bg-white top-16 shadow-md py-2 rounded-b-md ${
                    open ? "block" : "hidden"
                  }`}
                >
                  {userInfo.role === "Seller" && (
                    <Link href={"/admin"}>
                      <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                        Admin Dashboard
                      </li>
                    </Link>
                  )}
                  <Link href={"/profile"}>
                    <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                      Profile
                    </li>
                  </Link>
                  <Link href={"/orders"}>
                    <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                      Orders
                    </li>
                  </Link>
                  <Link href={"/wishlist"}>
                    <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                      Wishlist
                    </li>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 cursor-pointer text-red-600"
                  >
                    Logout
                  </button>
                </ul>
              )}
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  type="button"
                  className="hidden md:inline-block rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <div className="relative mr-2">
            <MdOutlineShoppingCart
              onClick={() => setCartDropDown(!cartDropDown)}
              className="w-7 mx-4 text-gray-800 h-7 cursor-pointer"
            />
            <span className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItemsInCart}
            </span>
          </div>
          <RiMenu3Fill
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
        {cartDropDown && (
          <ul
            className={`absolute md:hidden z-10 w-full right-0 bg-white top-16 shadow-md pb-2 rounded-b-md transition-all duration-300 ${cartDropDown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="relative w-screen max-w-sm px-4 pb-2 sm:px-6 lg:px-8">
              <div className="mt-4 space-y-6">
                {(userCartData?.length ?? 0) > 0 ? (
                  <>
                    <ul>
                      {userCartData.map((cartItem, index) => (
                        <li
                          key={index}
                          className="flex py-3 border-b-2 w-full md:w-[300px] items-center gap-4"
                        >
                          <Image
                            src={cartItem.productID.image}
                            alt={cartItem.productID.name}
                            width={300}
                            height={200}
                            className="size-16 rounded object-cover"
                          />
                          <div className="w-full">
                            <h3 className="text-sm text-gray-900">
                              {cartItem.productID.name}
                            </h3>
                            <div className="mt-0.5 w-full flex justify-between space-y-px text-gray-600">
                              <div className="w-full">
                                <div className="flex text-sm items-center gap-2">
                                  <span>Price:</span>
                                  <span>
                                    {formatPrice(cartItem.discountPrice)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex text-sm items-center gap-2">
                                    <span>Quantity:</span>
                                    <span>{cartItem.quantity}</span>
                                  </div>
                                  {cartItem.quantity > 1 && (
                                    <div className="flex text-sm items-center gap-2">
                                      <span>Total:</span>
                                      <span>
                                        {formatPrice(cartItem.totalPrice)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => deleteCartProduct(cartItem._id)}
                              >
                                <MdDelete className="text-red-400 text-xl" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-700">
                      Overall Total: {formatPrice(totalPrice)}
                    </p>

                    <div className="space-y-4 text-center">
                      <button
                        onClick={() => router.push("/checkout")}
                        className="block rounded bg-indigo-500 w-full px-5 py-3 text-sm text-white transition hover:bg-indigo-400"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Your cart is empty</p>
                )}
              </div>
            </div>
          </ul>
        )}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link href="/">
                      <Image src={logo} width={150} alt="echobazar" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <IoMdClose className="text-xl text-black" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <nav className="grid gap-y-2 pb-3">
                    {!isAdminView &&
                      menuItemsOfMobile.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.divider ? (
                            <div className="border-t border-gray-200"></div>
                          ) : (
                            (item.name !== "Admin Dashboard" ||
                              userInfo?.role === "Seller") && (
                              <li
                                onClick={(event) =>
                                  handleListItemClick(event, index)
                                }
                                className="relative  list-none"
                              >
                                <Link
                                  href={item.link}
                                  className="text-md font-medium hover:text-[#6366f1] text-gray-800 transition-all"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            )
                          )}
                        </React.Fragment>
                      ))}
                    {isAdminView && (
                      <div className="grid gap-y-2">
                        <Link href={"/admin/all-product"}>
                          <li className="text-md list-none font-medium hover:text-[#6366f1] text-gray-800 transition-all">
                            Manage All Products
                          </li>
                        </Link>
                        <Link href={"/admin/add-product"}>
                          <li className="text-md list-none font-medium hover:text-[#6366f1] text-gray-800 transition-all">
                            Add New Product
                          </li>
                        </Link>
                        <Link href={"/"}>
                          <li className="text-md list-none font-medium hover:text-[#6366f1] text-gray-800 transition-all">
                            Client View
                          </li>
                        </Link>
                      </div>
                    )}
                    {isLoggedIn ? (
                      <>
                        {" "}
                        <button
                          onClick={handleLogout}
                          className="py-2 cursor-pointer text-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <button
                            type="button"
                            className="block md:hidden w-full rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            Login
                          </button>
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
