import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";


const ProductDetails = ({ product }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <section className="md:p-8 p-3 bg-white mt-10 md:py-16 rounded-md">
      <div className="max-w-7xl px-4 mx-auto 2xl:px-0 relative">
        <div className="absolute top-0 right-[16rem] md:right-[-75px] z-10">
          <button
            type="button"
            className="w-10 md:w-max flex justify-center items-center mt-3 h-10 md:py-2 md:px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray1800 hover:bg-gray-100"
          >
            <CiHeart className="text-2xl" />
          </button>
          <button
            type="button"
            className="w-10 md:w-max flex justify-center items-center mt-3 h-10 md:py-2 md:px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            <IoMdShare className="text-2xl" />
          </button>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <Image
              src={product.image}
              height={400}
              width={400}
              alt="product image"
            />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-yellow-400"><FaStar/></span>
              <span className="text-yellow-400"><FaStar/></span>
              <span className="text-yellow-400"><FaStar/></span>
              <span className="text-yellow-400"><FaStar/></span>
              <span className="text-yellow-400"><FaStarHalfAlt/></span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="text-2xl font-extrabold text-gray-900">
                {formatPrice(product.discountPrice)}
              </p>
              <p className="text-sm text-gray-900">
                M.R.P. :{" "}
                <span className="line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </p>
            </div>
            <div className="mt-3 sm:gap-4 sm:items-center sm:flex">
              <button
                type="button"
                className="rounded flex w-full items-center justify-center gap-2 md:w-52 bg-yellow-400 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="rounded flex w-full mt-2 md:mt-0 items-center justify-center gap-2 md:w-52 bg-indigo-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                <MdOutlineShoppingCart className="text-lg" /> Add To Cart
              </button>
            </div>
            <hr className="my-6 md:my-8 border-gray-200" />
            <div>
              <label
                htmlFor="colorSelect"
                className="block font-medium text-gray-700"
              >
                Select Color:
              </label>
              <select
                id="colorSelect"
                name="color"
                className="select-menu mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Choose a color
                </option>
                {product.colors.map((color, index) => (
                  <option
                    key={index}
                    value={color}
                    className="select-option bg-white rounded-md"
                  >
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <p className="mb-6 mt-4 block font-medium text-gray-700">Storage Options:</p>
            <div className="flex gap-2">
              {product.storageOptions.map((storageOption, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 py-1 px-3 rounded-lg"
                >
                  {storageOption}
                </span>
              ))}
            </div>
            <p className="mb-6 mt-4 block font-medium text-gray-700">Description:</p>
            <p className="mb-6 whitespace-pre-wrap">{product.description}</p>
            <p className="mb-6 mt-4 block font-medium text-gray-700">Seller:</p>
            <p className="mb-6">{product.sellerName}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
