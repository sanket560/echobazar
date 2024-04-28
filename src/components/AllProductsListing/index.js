'use client'
import { GlobalContext } from "@/context";
import React, { useContext } from "react";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllProductListing = () => {
  const { allProduct } = useContext(GlobalContext);

  return (
    <div className="w-[1450px] px-5 pb-10 md:pb-20 mx-auto">
      <p className="font-semibold mb-4 text-3xl">All Products</p>
      {allProduct.length == 0 ? (
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Skeleton width={280} height={350}/>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {allProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProductListing;
