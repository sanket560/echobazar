"use client";
import React, { useState } from "react";

// Smart TV Form Component
export const SmartTVForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [displaySizes, setDisplaySizes] = useState([""]);
  const [os, setOS] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDisplaySizeChange = (index, value) => {
    const newDisplaySizes = [...displaySizes];
    newDisplaySizes[index] = value;
    setDisplaySizes(newDisplaySizes);
  };

  const addDisplaySizeField = () => {
    setDisplaySizes([...displaySizes, ""]);
  };

  const removeDisplaySizeField = (index) => {
    const newDisplaySizes = [...displaySizes];
    newDisplaySizes.splice(index, 1);
    setDisplaySizes(newDisplaySizes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      brand,
      image,
      displaySizes,
      os,
      description,
    };
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Smart TV Form</h2>
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        {displaySizes.map((size, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`displaySize${index}`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Display Size {index + 1}
            </label>
            <input
              type="text"
              id={`displaySize${index}`}
              value={size}
              onChange={(e) => handleDisplaySizeChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => removeDisplaySizeField(index)}
              className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDisplaySizeField}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Display Size
        </button>
        <div className="mb-4">
          <label
            htmlFor="os"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Operating System
          </label>
          <input
            type="text"
            id="os"
            value={os}
            onChange={(e) => setOS(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Smart TV
        </button>
      </form>
    </div>
  );
};