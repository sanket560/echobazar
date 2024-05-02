'use client'
import { GlobalContext } from "@/context";
import React, { useContext } from "react";
import ProductCard from "../ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LatestProduct = () => {
  const { allProduct } = useContext(GlobalContext);
  const latestProducts = allProduct.filter(product => product.latestProduct === "yes");

  return (
    <div className="md:w-[1450px] px-5 pb-10 md:pb-20 mx-auto">
      <p className="font-semibold mb-4 text-3xl">Latest Products</p>
      {latestProducts.length == 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Skeleton width={280} height={350}/>
            </div>
          ))}
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

export default LatestProduct;