"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseStorageURL } from "@/utils/firebaseConfig";
import { GlobalContext } from "@/context";
import Image from "next/image";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const helperForUploadingImageToFirebase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecobazar/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};

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
  const [latestProduct, setlatestProduct] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.latestProduct : "yes"
  );
  const [selectedImage, setSelectedImage] = useState(
    selectedProductToUpdate ? selectedProductToUpdate.image : null
  );
  const { userInfo } = useContext(GlobalContext);
  const sellerName = userInfo?.name;

  const handleImageChange = async (e) => {
    const extractImageUrl = await helperForUploadingImageToFirebase(
      e.target.files[0]
    );
    // console.log(extractImageUrl);
    if (extractImageUrl !== "") {
      setImage(extractImageUrl);
      setSelectedImage(extractImageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(""); // Clear the image state
    setSelectedImage(null); // Clear the selected image state
  };

  const renderImageUpload = () => {
    if (selectedImage) {
      return (
        <div className="mb-4">
          <Image src={selectedImage} width={200} height={300} alt="Selected" className="w-96 mx-auto" />
          <button type="button" onClick={handleRemoveImage} className="mt-2 text-red-500">
            Remove Image
          </button>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label
            htmlFor="image"
            className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Upload Product Image
            </h2>

            <p className="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your image (PNG, JPG).
            </p>

            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              required
            />
          </label>
        </div>
      );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      brand,
      image,
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

  const isValidForm = () => {
    return name &&
      name.trim() !== "" &&
      typeof discountPrice === "string" &&
      discountPrice.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white mt-8">
      <form onSubmit={handleSubmit}>
        {renderImageUpload()}
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
            onChange={(e) => setlatestProduct(e.target.value)}
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
