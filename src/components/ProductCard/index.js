"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const ProductCard = ({ product }) => {
  const pathname = usePathname();
  const isAdminView = pathname.includes("admin");

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="flex items-center justify-center">
        <Image
          src={product.image}
          loading="lazy"
          width={300}
          height={550}
          alt={product.name}
          className="w-60 h-52 transition duration-200 group-hover:scale-110"
        />
      </div>
      <p className="hover:gray-800 py-3 mb-1 text-gray-500 transition duration-100 lg:text-lg">
        {product.name}
      </p>
      <p className="font-bold text-gray-800 lg:text-lg">
        ₹ {product.originalPrice}
      </p>
      {/* {isAdminView && (
        <div className="flex items-center space-x-2 my-2">
          <button
            type="button"
            className="rounded md:w-40 bg-yellow-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            Update
          </button>
          <button
            type="button"
            className="rounded md:w-40 bg-red-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
          >
            Delete
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
