"use client";
import React, { useContext, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseStorageURL } from "@/utils/firebaseConfig";
import { resolve } from "styled-jsx/css";
import { GlobalContext } from "@/context";

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
export const PhoneForm = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([""]);
  const [storageOptions, setStorageOptions] = useState([""]);
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [onSale, setOnSale] = useState("yes");
  const { userInfo } = useContext(GlobalContext);
  const sellerName = userInfo.name;
  const type = "phone";

  const handleImageChange = async (e) => {
    const extractImageUrl = await helperForUploadingImageToFirebase(
      e.target.files[0]
    );
    // console.log(extractImageUrl);
    if (extractImageUrl !== "") {
      setImage(extractImageUrl);
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
      type,
      brand,
      image,
      colors,
      storageOptions,
      description,
      originalPrice,
      onSale,
      discountPrice,
      sellerName,
    };
    onSubmit(formData);
  };

  const isValidForm = () => {
    return name &&
      name.trim() !== "" &&
      discountPrice &&
      discountPrice.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Phone Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Other fields */}
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
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
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
            <input
              type="text"
              id={`color${index}`}
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
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
            <input
              type="text"
              id={`storage${index}`}
              value={storage}
              onChange={(e) => handleStorageChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
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
        <div className="mb-4">
          <label
            htmlFor="onsale"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            On Sale
          </label>
          <select
            id="onSale"
            value={onSale}
            onChange={(e) => setOnSale(e.target.value)}
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
