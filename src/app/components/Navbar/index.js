'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import logo from '../../../Images/logo.svg'

const isAdminView = false;
const isAuthUser = false;

const user = {
  role : 'admin'
}


const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          href='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <Image src={logo} width={150} alt='echobazar logo' />
        </Link>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white'>
            {!isAdminView && isAuthUser ? (
              <>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                  >
                    Account
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                  >
                    Cart
                  </a>
                </li>
              </>
            ) : null}
            {user?.role === "admin" && isAdminView ? (
              <li>
                <a
                  href='#'
                  className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                >
                  client View
                </a>
              </li>
            ) : (
              <li>
                <a
                  href='#'
                  className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                >
                  Admin View
                </a>
              </li>
            )}
            {isAuthUser ? (
              <li>
                <a
                  href='#'
                  className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <a
                  href='#'
                  className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
                >
                  Login
                </a>
              </li>
            )}
            {/* <li>
              <a
                href='#'
                className='block py-2 px-3 rounded md:bg-transparent md:p-0'
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 '
              >
                About
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0'
              >
                Services
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0'
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0'
              >
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar