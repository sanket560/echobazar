"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../Images/logo.svg";
import { adminNavOptions, navOptions } from "@/utils";

const isAdminView = false;
const isAuthUser = true;

const user = {
  role: "admin",
};

function NavItems() {
  return (
    <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white border border-gray-100'>
      {isAdminView
        ? adminNavOptions.map((item) => (
            <li
              className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
              key={item.id}
            >
              {item.label}
            </li>
          ))
        : navOptions.map((item) => (
            <li
              className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
              key={item.id}
            >
              {item.label}
            </li>
          ))}
    </ul>
  );
}

const Navbar = () => {
  return (
    <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <div className='flex items-center cursor-pointer'>
          <Image src={logo} width={150} alt="logo" />
        </div>
        <NavItems />
        <div className='flex items-center md:order-2 gap-2'>
          {!isAdminView && isAuthUser ? (
            <>
              <a
                className={
                  "cursor-pointer mr-2 font-medium block py-2 px-3 text-gray-900 rounded md:p-0"
                }
              >
                Account
              </a>
              <a
                className={
                  "cursor-pointer mr-2 font-medium block py-2 px-3 text-gray-900 rounded md:p-0"
                }
              >
                Cart
              </a>
            </>
          ) : null}
          {user?.role === "admin" ? (
            isAdminView ? (
              <a
                className={
                  "cursor-pointer mr-2 font-medium block py-2 px-3 text-gray-900 rounded md:p-0"
                }
              >
                Client View
              </a>
            ) : (
              <a
                className={
                  "cursor-pointer mr-2 font-medium block py-2 px-3 text-gray-900 rounded md:p-0"
                }
              >
                Admin View
              </a>
            )
          ) : null}
          {isAuthUser ? (
            <button
              type='button'
              className='text-white mr-2 bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 focus:outline-none'
            >
              Logout
            </button>
          ) : (
            <button
              type='button'
              className='text-white mr-2 bg-[#07bfcd] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 focus:outline-none'
            >
              Login
            </button>
          )}

          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
