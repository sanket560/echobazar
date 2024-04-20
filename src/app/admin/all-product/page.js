"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(
        //   `${FRONTEND_BASE_URL}/api/admin/all-product`,
        //   {
        //     method: "GET",
        //   }
        // );
        const response = await fetch(
          `http://localhost:3000/api/admin/all-product`,
          {
            method: "GET",
          }
        );
        const responseData = await response.json();
        setProducts(responseData?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []); 
  
  // console.log(products);

  return (
    <div className="flex items-center justify-center md:mt-10 px-5">
      <div className="py-6 sm:py-4 lg:py-12">
        <p className="text-center text-xl font-semibold pb-3">Click On Any Product To Update </p>
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">You don't have any products.</p>
          ) : (
            <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
