"use client";
import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/controller/address";
import { deleteFromCart } from "@/controller/cart";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";

const page = () => {
  const {
    userInfo,
    userCartData,
    extractGetAllCartItems,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const totalPrice = userCartData?.reduce((total, cartItem) => {
    const itemTotalPrice = cartItem.discountPrice * cartItem.quantity;
    cartItem.totalPrice = itemTotalPrice;
    return total + itemTotalPrice;
  }, 0);

  const discountPercentage = 20;
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount + 200;

  async function deleteCartProduct(getId) {
    const res = await deleteFromCart(getId);
    extractGetAllCartItems();
    if (res.success) {
      toast.success("Product Removed From Cart");
    } else {
      toast.error("Failed to remove product");
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
  };

  async function getUserAddress() {
    if (userInfo && userInfo._id) {
      const res = await fetchAllAddresses(userInfo._id);
      setUserAddress(res.data);
    }
  }

  useEffect(() => {
    if (userInfo && userInfo._id) {
      getUserAddress();
    }
  }, [userInfo]);

  function handleAddressSelect(getAddress) {
    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        name: getAddress.name,
        address: getAddress.address,
        country: getAddress.country,
        city: getAddress.city,
        state: getAddress.state,
        postalCode: getAddress.postalCode,
      },
    });
  }

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <p className="text-lg my-5 text-center md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
        Confirm your details check product and select shipping addresss
      </p>
      <div className="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customers Cart
            </p>
            {(userCartData?.length ?? 0) > 0 ? (
              userCartData.map((cartItem, index) => (
                <div
                  key={index}
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  <Link href={`/product/${cartItem.productID._id}`}>
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <Image
                        className="w-full"
                        src={cartItem.productID.image}
                        alt={cartItem.productID.name}
                        width={200}
                        height={300}
                      />
                    </div>
                  </Link>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                      <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                        {cartItem.productID.name}
                      </h3>
                      <div className="flex justify-start items-start flex-col space-y-2">
                        <p className="text-sm leading-none text-gray-800">
                          Brand: {cartItem.productID.brand}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          Storage: {cartItem.storageOptions}
                        </p>
                        <p className="text-sm leading-none text-gray-800">
                          Color: {cartItem.colors}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-around space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        {formatPrice(cartItem.discountPrice)}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        {cartItem.quantity}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                        {formatPrice(cartItem.totalPrice)}
                      </p>
                    </div>
                    <button onClick={() => deleteCartProduct(cartItem._id)}>
                      <MdDelete className="text-red-400 text-xl" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-4 text-gray-800">Total</p>
                  <p className="text-base leading-4 text-gray-600">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Discount</p>
                  <p className="text-base leading-4 text-gray-600">
                    {discountPercentage}% ({formatPrice(discountAmount)})
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">
                    Shipping charges
                  </p>
                  <p className="text-base leading-4 text-gray-600">₹ 200.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Overall Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  {formatPrice(finalPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Customer
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base font-semibold leading-4 text-left text-gray-800">
                    {userInfo?.name}
                  </p>
                  <p className="cursor-pointer text-sm leading-5 ">
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  {userAddress.length > 0 ? (
                    userAddress.map((addr, index) => (
                      <div
                        onClick={() => setSelectedAddress(addr._id)}
                        className={`flex items-start justify-between mb-4 mt-2 rounded-md bg-gray-100 p-3 ${addr._id === selectedAddress ? "border border-green-400" : ""}`}
                        key={index}
                      >
                        <div className="flex capitalize flex-col">
                          <p className="text-sm text-gray-900">
                            Name of recipient: {addr.name}
                          </p>
                          <p className="text-sm text-gray-900">
                            Address: {addr.address}
                          </p>
                          <p className="text-sm text-gray-700">
                            City: {addr.city}
                          </p>
                          <p className="text-sm text-gray-700">
                            State: {addr.state}
                          </p>
                          <p className="text-sm text-gray-700">
                            Country: {addr.country}
                          </p>
                          <p className="text-sm text-gray-700">
                            Pincode: {addr.postalCode}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={addr._id === selectedAddress}
                            onChange={() => setSelectedAddress(addr._id)}
                            className="form-radio text-indigo-600"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      You have not added an address.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={
                (userCartData && userCartData.length === 0) || !selectedAddress
              }
              className="flex disabled:bg-indigo-400 items-center mt-8 justify-center rounded bg-indigo-500 w-full px-5 py-2 text-sm text-white transition hover:bg-indigo-400"
            >
              Checkout <MdArrowRightAlt className="text-3xl ml-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
