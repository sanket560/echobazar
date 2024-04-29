"use client";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const imageStyles = {
  width: "400px",
  aspectRatio: "3/2",
  objectFit: "contain",
  padding: "8px",
};

const ProductCard = ({ product, fetchProducts }) => {
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
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="md:w-[325px] mx-auto">
      <div className="bg-white shadow-md rounded-lg">
        <Link href={`/product/${product._id}`}>
          <Image
            style={imageStyles}
            src={product.image}
            width={300}
            height={400}
            alt="product image"
            className="cursor-pointer"
          />
        </Link>
        <div className="flex flex-col gap-2 px-5 pb-5">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-xl md:text-2xl font-extrabold text-gray-900">
              {formatPrice(product.discountPrice)}
            </p>
            <p className="text-sm md:text-lg text-gray-900">
              M.R.P. :{" "}
              <span className="line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </p>
          </div>
          {isAdminView && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// : (
//   {/* <div className="flex items-center space-x-2 my-2">
//     <button
//       onClick={() => router.push(`/product/${product._id}`)}
//       type="button"
//       className="rounded px-4 w-full md:w-32 bg-indigo-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//     >
//       Details
//     </button>
//     <button
//       type="button"
//       className="rounded w-full px-3 bg-green-500 md:px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//     >
//       Add To Cart
//     </button>
//   </div> */}
// )
