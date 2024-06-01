"use client";
import ProductCard from "@/components/ProductCard";
import { GlobalContext } from "@/context";
import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const page = () => {
  const { allProduct } = useContext(GlobalContext);
  const latestProducts = allProduct.filter(
    (product) => product.brand === "Redmi"
  );

  return (
    <div className="md:w-[1450px] px-5 pb-10 mt-10 md:mt-20 md:pb-20 mx-auto">
      {latestProducts.length == 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <div className="hidden md:flex md:space-x-4 lg:space-x-8">
            <Skeleton width={330} height={350} />
            <Skeleton width={330} height={350} />
            <Skeleton width={330} height={350} />
            <Skeleton width={330} height={350} />
          </div>
          <div className="block md:hidden">
            <Skeleton width={349} height={350} count={3} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;