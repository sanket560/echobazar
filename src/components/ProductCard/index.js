"use client";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const imageStyles = {
  width: "400px",
  aspectRatio: "3/2",
  objectFit: "contain",
  padding: "8px",
};

const ProductCard = ({ product ,products, setProducts }) => {
  const { setSelectedProductToUpdate } = useContext(GlobalContext);
  const pathname = usePathname();
  const router = useRouter();
  const isAdminView = pathname.includes("admin");

  const handleUpdateClick = () => {
    setSelectedProductToUpdate(product);
    router.push(`/admin/update-product`);
  };

  const deleteAProduct = async (productId) => {
    try {
      const res = await fetch(`/api/admin/delete-product?id=${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
  
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setProducts(products.filter((p) => p._id !== productId));
      } else {
        toast.error(data.message);
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg max-w-sm">
        <Image
          style={imageStyles}
          src={product.image}
          width={300}
          height={400}
          alt="product image"
        />
        <div className="flex flex-col gap-2 px-5 pb-5">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              &#x20B9; {product.originalPrice}
            </span>
          </div>
          {isAdminView ? (
            <div className="flex items-center space-x-2 my-2">
              <button
                onClick={handleUpdateClick}
                type="button"
                className="rounded w-24 md:w-36 bg-yellow-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Update
              </button>
              <button
               onClick={() => deleteAProduct(product._id)}
                type="button"
                className="rounded w-24 md:w-36 bg-red-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 my-2">
              <button
                type="button"
                className="rounded w-24 md:w-36 bg-indigo-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              >
                Details
              </button>
              <button
                type="button"
                className="rounded px-3 md:w-36 bg-green-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
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
