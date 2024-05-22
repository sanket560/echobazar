"use client";
import { PhoneForm } from "@/components/PhoneForm";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { selectedProductToUpdate, isLoggedIn, userInfo } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || userInfo?.role !== "Seller") {
      router.push('/');
    }
  }, [isLoggedIn, userInfo?.role, router]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      formData._id = selectedProductToUpdate._id;
      const response = await fetch('/api/admin/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.push('/admin/all-product');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 my-auto py-10 px-5">
      <div className="md:w-[800px] bg-white pt-10 mx-auto mt-8 p-4 rounded shadow-md">
        <h2 className="text-3xl font-semibold text-center">Update Product</h2>
        <PhoneForm 
          selectedProductToUpdate={selectedProductToUpdate} 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default UpdateProduct;