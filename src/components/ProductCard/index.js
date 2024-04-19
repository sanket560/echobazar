'use client'
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const ProductCard = () => {
  const pathname = usePathname();
  const isAdminView = pathname.includes("admin");

  return (
    <div>
      <a
        href="#"
        className="group relative mb-2 block h-80 overflow-hidden rounded-lg bg-gray-100 lg:mb-3"
      >
        <Image
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&q=75&fit=crop&w=600"
          loading="lazy"
          width={300}
          height={550}
          alt="Photo by Rachit Tank"
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </a>
      <p className="hover:gray-800 mb-1 text-gray-500 transition duration-100 lg:text-lg">
        Timely Watch
      </p>
      <p className="font-bold text-gray-800 lg:text-lg">$15.00</p>
      {isAdminView && <div className="flex items-center space-x-2 my-2">
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
      </div>}
    </div>
  );
};

export default ProductCard;
