"use client";
import { MensForm } from "@/components/MensForm";
import { PhoneForm } from "@/components/PhoneForm";
import { SmartTVForm } from "@/components/SmartTVForm";
import { WomensForm } from "@/components/WomensForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


const AddNewProducut = () => {
  const [selectedProductType, setSelectedProductType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        <div className="mb-4 md:w-96 mx-auto">
          <label
            htmlFor="productType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Product Type
          </label>
          <select
            id="productType"
            value={selectedProductType}
            onChange={(e) => setSelectedProductType(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="">Select Product Type</option>
            <option value="phone">Phone</option>
            <option value="mens">Men's</option>
            <option value="womens">Women's</option>
            <option value="smart_tv">Smart TV</option>
          </select>
        </div>
        {selectedProductType === "phone" && (
          <PhoneForm onSubmit={handleFormSubmit} isLoading={isLoading}/>
        )}
        {selectedProductType === "mens" && (
          <MensForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
        {selectedProductType === "womens" && (
          <WomensForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
        {selectedProductType === "smart_tv" && (
          <SmartTVForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default AddNewProducut;
