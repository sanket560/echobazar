"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../Images/logo.svg";
import { FiUser } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    name: "Vivo",
    link: "/vivo",
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
    name: "Smart TV",
    link: "/smartTv",
  },
  {
    name: "Men",
    link: "/mens",
  },
  {
    name: "Women",
    link: "/womens",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } =
    useContext(GlobalContext);
  const navbarRef = useRef(null);
  const isAdminView = pathname.includes("admin");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setDropdownIndex(null);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };

  // console.log(userInfo);

  return (
    <div className="shadow-md w-full z-30 fixed top-0 left-0" ref={navbarRef}>
      <div className="flex items-center z-30 h-16 justify-between bg-white py-2 md:px-10 px-4">
        <div className="font-bold text-2xl cursor-pointer flex items-center justify-between gap-1">
          <Link href="/">
            <Image src={logo} width={150} alt="echobazar" />
          </Link>
        </div>
        {!isAdminView && <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item, index) => (
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
                  {item.dropdownItems && (
                    <IoIosArrowDown className="text-gray-500" />
                  )}
                </Link>
                {item.dropdownItems && dropdownIndex === index && (
                  <div className="absolute top-full -left-4 bg-white shadow-lg py-2 mt-1 rounded-md divide-y divide-gray-100 z-10">
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        href={`/report/${dropdownItem.category}`}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>}
        {isAdminView && <div className="hidden md:block">
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
        </div>}
        <div className="flex items-center">
          {!isAdminView && <MdOutlineShoppingCart className="w-7 mx-4 text-gray-800 hidden md:block h-7 cursor-pointer" />}
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
                  <Link href={"/orderHistory"}>
                    <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                      Order History
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
          <MdOutlineShoppingCart className="w-7 mx-4 text-gray-800 md:hidden block h-7 cursor-pointer" />
          <RiMenu3Fill
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer"
          />
        </div>
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
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item, index) => (
                      <li
                        key={item.name}
                        onClick={(event) => handleListItemClick(event, index)}
                        className="relative list-none"
                      >
                        <Link
                          href={item.link}
                          className="text-md flex items-center gap-2 font-semibold text-gray-800 hover:text-gray-900"
                        >
                          {item.name}
                          {item.dropdownItems && (
                            <IoIosArrowDown className="text-gray-500" />
                          )}
                        </Link>
                        {item.dropdownItems && dropdownIndex === index && (
                          <div className="absolute top-full left-0 bg-white shadow-lg py-2 mt-1 rounded-md divide-y divide-gray-100 z-10">
                            {item.dropdownItems.map(
                              (dropdownItem, dropdownIndex) => (
                                <Link
                                  key={dropdownIndex}
                                  href={`/report/${dropdownItem.category}`}
                                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                >
                                  {dropdownItem.name}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                    {!isLoggedIn && (
                      <Link href="/login">
                        <button
                          type="button"
                          className="md:hidden w-full inline-block rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        >
                          Login
                        </button>
                      </Link>
                    )}
                    {isLoggedIn && (
                      <>
                        <FiUser
                          className="w-7 h-7 cursor-pointer mx-2 md:mx-3"
                          onClick={() => setOpen(!open)}
                        />
                        {open && (
                          <ul
                            className={`absolute z-10 w-36 right-5 top-16 shadow-md py-2 rounded-md ${
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
                            <Link href={"/orderHistory"}>
                              <li className="px-4 flex items-center gap-2 py-2 cursor-pointer">
                                Order History
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
