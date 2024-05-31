"use client";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn, userInfo } = useContext(GlobalContext);

  useEffect(() => {
    if (!isLoggedIn || userInfo?.role !== "Seller") {
      router.push("/");
    }
  }, [isLoggedIn, userInfo?.role, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${FRONTEND_BASE_URL}/api/admin/all-product`, {
        method: "GET",
      });
      const responseData = await response.json();

      if (userInfo && responseData?.data) {
        const filteredProducts = responseData.data.filter(
          (product) => product.sellerName === userInfo.name
        );
        setProducts(filteredProducts);
      } else {
        setProducts([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchProducts();
    }
  }, [userInfo]);

  return (
    <div className="flex items-center justify-center mt-10 px-5">
      <div className="py-6 sm:py-4 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          {loading ? (
            <>
              <div className="hidden md:flex md:space-x-4 lg:space-x-8">
                <Skeleton width={330} height={350} />
                <Skeleton width={330} height={350} />
                <Skeleton width={330} height={350} />
                <Skeleton width={330} height={350} />
              </div>
              <div className="block md:hidden">
                <Skeleton width={349} height={350} count={3} />
              </div>
            </>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">
              You don&apos;t have any products.
            </p>
          ) : (
            <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  fetchProducts={fetchProducts} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;