"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const imageStyles = {
  width: "400px",
  aspectRatio: "3/2",
  objectFit: "contain",
  padding: "8px",
};

const ProductCard = ({ product }) => {
  const pathname = usePathname();
  const isAdminView = pathname.includes("admin");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm">
        <a href="#">
          <Image
            style={imageStyles}
            src={product.image}
            width={300}
            height={400}
            alt="product image"
          />
        </a>
        <div className="flex flex-col gap-2 px-5 pb-5">
          <a href="#">
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
              Apple Watch {product.name}
            </h3>
          </a>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              &#x20B9; {product.originalPrice}
            </span>
          </div>
          {isAdminView ? (
            <div className="flex items-center space-x-2 my-2">
              <button
                type="button"
                className="rounded md:w-36 bg-yellow-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Update
              </button>
              <button
                type="button"
                className="rounded md:w-36 bg-red-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 my-2">
              <button
                type="button"
                className="rounded md:w-36 bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Details
              </button>
              <button
                type="button"
                className="rounded md:w-36 bg-green-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Add To Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
