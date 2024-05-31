"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import Image from "next/image";

// Phone Form Component
export const PhoneForm = ({ onSubmit, isLoading, selectedProductToUpdate }) => {
  const [name, setName] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.name : ""
  );
  const [brand, setBrand] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.brand : ""
  );
  const [image, setImage] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.image : ""
  );
  const [colors, setColors] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.colors : [""]
  );
  const [storageOptions, setStorageOptions] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.storageOptions : [""]
  );
  const [description, setDescription] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.description : ""
  );
  const [originalPrice, setOriginalPrice] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.originalPrice : ""
  );
  const [discountPrice, setDiscountPrice] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.discountPrice : ""
  );
  const [latestProduct, setLatestProduct] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.latestProduct : "yes"
  );
  const [selectedImage, setSelectedImage] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.image : null
  );
  const { userInfo } = useContext(GlobalContext);
  const sellerName = userInfo?.name;

  const CLOUD_NAME = "df0tgq0yy";
  const UPLOAD_PRESET = "NEXTJS_echobazar";

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data["secure_url"];
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorChange = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleStorageChange = (index, value) => {
    const newStorageOptions = [...storageOptions];
    newStorageOptions[index] = value;
    setStorageOptions(newStorageOptions);
  };

  const addColorField = () => {
    setColors([...colors, ""]);
  };

  const addStorageField = () => {
    setStorageOptions([...storageOptions, ""]);
  };

  const removeColorField = (index) => {
    const newColors = [...colors];
    newColors.splice(index, 1);
    setColors(newColors);
  };

  const removeStorageField = (index) => {
    const newStorageOptions = [...storageOptions];
    newStorageOptions.splice(index, 1);
    setStorageOptions(newStorageOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = selectedImage instanceof File ? await uploadImage() : selectedImage;

    const formData = {
      name,
      brand,
      image: imageUrl,
      colors,
      storageOptions,
      description,
      originalPrice,
      latestProduct,
      discountPrice,
      sellerName,
    };
    onSubmit(formData);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const isValidForm = () => {
    return (
      name &&
      name.trim() !== "" &&
      typeof discountPrice === "string" &&
      discountPrice.trim() !== ""
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white mt-8">
      <form onSubmit={handleSubmit}>
        <h2 className="my-4 text-xl font-medium text-gray-700 tracking-wide">
          Upload Product Image
        </h2>
        {selectedImage ? (
          <div className="mb-4">
            <Image
              src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage}
              alt="Selected"
              className="mb-2"
              width={300}
              height={400}
            />
            <button
              type="button"
              onClick={handleImageRemove}
              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Upload only PNG or JPG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Brand
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          >
            <option value="">Select Brand</option>
            <option value="Vivo">Vivo</option>
            <option value="IPhone">IPhone</option>
            <option value="Oppo">Oppo</option>
            <option value="Redmi">Redmi</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="originalPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Original Price
          </label>
          <input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountPrice"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Discount Price
          </label>
          <input
            type="number"
            id="discountPrice"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>
        {colors.map((color, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`color${index}`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Color {index + 1}
            </label>
            <select
              id={`color${index}`}
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              required
            >
              <option value="">Select Color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Purple">Purple</option>
              <option value="Blue">Blue</option>
              <option value="Pink">Pink</option>
              <option value="Brown">Brown</option>
            </select>
            <button
              type="button"
              onClick={() => removeColorField(index)}
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColorField}
          className="w-full rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mb-3"
        >
          Add Color
        </button>
        {storageOptions.map((storage, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`storage${index}`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Storage Option {index + 1}
            </label>
            <select
              id={`storage${index}`}
              value={storage}
              onChange={(e) => handleStorageChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              required
            >
              <option value="">Select Storage Option</option>
              <option value="6GB RAM, 16GB Internal Storage">
                6GB RAM, 16GB Internal Storage
              </option>
              <option value="8GB RAM, 32GB Internal Storage">
                8GB RAM, 32GB Internal Storage
              </option>
              <option value="12GB RAM, 64GB Internal Storage">
                12GB RAM, 64GB Internal Storage
              </option>
              <option value="16GB RAM, 128GB Internal Storage">
                16GB RAM, 128GB Internal Storage
              </option>
              <option value="32GB RAM, 256GB Internal Storage">
                32GB RAM, 256GB Internal Storage
              </option>
            </select>
            <button
              type="button"
              onClick={() => removeStorageField(index)}
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addStorageField}
          className="w-full rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] mb-3"
        >
          Add Storage Option
        </button>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="latestProduct"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Is This Latest Trending
          </label>
          <select
            id="latestProduct"
            value={latestProduct}
            onChange={(e) => setLatestProduct(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!isValidForm() || isLoading}
          className={`disabled:opacity-50 w-full rounded bg-indigo-500 px-6 py-1.5 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            "Add The Product"
          )}
        </button>
      </form>
    </div>
  );
};
