"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { addToCart } from "@/controller/cart";
import { GlobalContext } from "@/context";
import toast from "react-hot-toast";

const ProductDetails = ({ product }) => {
  const { userInfo , isLoggedIn, extractGetAllCartItems} = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [storageOptions, setStorageOptions] = useState("");
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  async function handleAddToCart() {
    if (!isLoggedIn) {
      toast.error("Please log in first to add products to the cart.");
      return;
    }

    setIsLoading(true);
    const res = await addToCart({
      productID: product._id,
      userID: userInfo._id,
      colors: selectedColor,
      storageOptions: storageOptions,
      quantity: quantity,
      discountPrice: product.discountPrice,
      originalPrice: product.originalPrice,
      brand: product.brand,
    });
    setIsLoading(false);
    if (res.success) {
      toast.success(res.message);
      await extractGetAllCartItems();
    } else {
      toast.error(res.message);
      await extractGetAllCartItems();
    }
  }

  const isValidForm = () => {
    return selectedColor &&
      selectedColor.trim() !== "" &&
      storageOptions &&
      storageOptions.trim() !== ""
      ? true
      : false;
  };

  return (
    <section className="md:p-8 p-3 bg-white mt-10 md:py-16 rounded-md">
      <div className="max-w-7xl px-4 mx-auto 2xl:px-0">
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
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <span className="text-yellow-400">
                <FaStarHalfAlt />
              </span>
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
                disabled={!isValidForm() || isLoading}
                onClick={handleAddToCart}
                className="disabled:opacity-50 rounded flex w-full mt-2 md:mt-0 items-center justify-center gap-2 md:w-52 bg-indigo-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#6366f1] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <>
                    <MdOutlineShoppingCart className="text-lg" /> Add To Cart
                  </>
                )}
              </button>
            </div>
            <hr className="my-6 md:my-8 border-gray-200" />
            <div>
              <p className="block font-medium text-gray-700">Select Color:</p>
              <div className="flex flex-wrap mt-1">
                {product.colors.map((color, index) => (
                  <label
                    key={index}
                    className="inline-flex items-center mr-4 mb-2"
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      required
                    />
                    <span className="ml-2 text-gray-700">{color}</span>
                  </label>
                ))}
              </div>
            </div>
            <p className="mb-6 mt-4 block font-medium text-gray-700">
              Storage Options:
            </p>
            <div className="flex gap-2">
              {product.storageOptions.map((storageOption, index) => (
                <button
                  key={index}
                  onClick={() => setStorageOptions(storageOption)}
                  required
                  className={`py-2 px-4 rounded-lg text-sm font-medium ${
                    storageOptions === storageOption
                      ? "bg-indigo-500 text-white"
                      : "border text-gray-900"
                  }`}
                >
                  {storageOption}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label
                htmlFor="quantity"
                className="block font-medium text-gray-700"
              >
                Quantity:
              </label>
              <input
                type="number"
                required
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <p className="mb-6 mt-4 block font-medium text-gray-700">
              Description:
            </p>
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
