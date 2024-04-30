"use client";
import { PhoneForm } from "@/components/PhoneForm";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


const AddNewProducut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {isLoggedIn  , userInfo} = useContext(GlobalContext);

  useEffect(() => {
    if (!isLoggedIn && userInfo?.role !== "Seller") {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/add-product", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.push('/admin/all-product')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally{
      setIsLoading(false)
    }
    // console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-100 my-auto py-10 px-5">
      <div className="md:w-[800px] bg-white pt-10 mx-auto mt-8 p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add New Product
        </h2>
        <PhoneForm onSubmit={handleFormSubmit} isLoading={isLoading}/>
      </div>
    </div>
  );
};

export default AddNewProducut;
