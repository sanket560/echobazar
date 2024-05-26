"use client";
import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/controller/address";
import { deleteFromCart } from "@/controller/cart";
import { createNewOrder } from "@/controller/order";
import { callStripeSession } from "@/controller/stripe";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { MdArrowRightAlt } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const PageContent = () => {
  const { isLoggedIn, userInfo, userCartData, extractGetAllCartItems } =
    useContext(GlobalContext);
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const stripePromise = loadStripe(PUBLISHABLE_KEY);

  const getUserAddress = useCallback(async () => {
    if (userInfo && userInfo._id) {
      const res = await fetchAllAddresses(userInfo._id);
      setUserAddress(res.data);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo && userInfo._id) {
      getUserAddress();
    }
  }, [userInfo, getUserAddress]);

  useEffect(() => {
    const createFinalOrder = async () => {
      const isStripe = JSON.parse(sessionStorage.getItem("stripe"));
      if (
        isStripe &&
        params.get("status") === "success" &&
        userCartData &&
        userCartData.length > 0
      ) {
        setIsOrderProcessing(true);
        const getOrderData = JSON.parse(sessionStorage.getItem("orderData"));

        if (
          !getOrderData ||
          !getOrderData.shippingAddress ||
          Object.keys(getOrderData.shippingAddress).length === 0
        ) {
          console.error("Retrieved Order Data is empty or invalid");
          return;
        }

        const createFinalOrderData = {
          user: userInfo?._id,
          shippingAddress: getOrderData.shippingAddress,
          orderItems: userCartData.map((item) => ({
            qty: item.quantity,
            product: item.productID._id,
          })),
          paymentMethod: "Stripe",
          totalPrice: getOrderData.totalPrice,
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        try {
          const res = await createNewOrder(createFinalOrderData);
          if (res.success) {
            setIsOrderProcessing(false);
            setOrderSuccess(true);
            extractGetAllCartItems();
            toast.success(res.message);
          } else {
            setIsOrderProcessing(false);
            setOrderSuccess(false);
            extractGetAllCartItems();
            toast.error(res.message);
          }
        } catch (error) {
          console.error("Order creation failed:", error);
          toast.error("An error occurred while creating the order.");
        }
      }
    };
    createFinalOrder();
  }, [
    params.get("status"),
    userCartData,
    extractGetAllCartItems,
    userInfo?._id,
  ]);

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, [3000]);
    }
  }, [orderSuccess]);

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    const selectedAddressDetails = userAddress.find(
      (addr) => addr._id === addressId
    );

    if (selectedAddressDetails) {
      const orderData = {
        shippingAddress: {
          name: selectedAddressDetails.name,
          city: selectedAddressDetails.city,
          country: selectedAddressDetails.country,
          state: selectedAddressDetails.state,
          postalCode: selectedAddressDetails.postalCode,
          address: selectedAddressDetails.address,
        },
        totalPrice: finalPrice,
        paymentMethod: "Stripe",
        isPaid: false,
        isProcessing: true,
      };

      sessionStorage.setItem("orderData", JSON.stringify(orderData));
    } else {
      console.error("Selected address details not found.");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    const orderData = JSON.parse(sessionStorage.getItem("orderData"));
    const stripe = await stripePromise;
    const createLineItems = userCartData.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          images: [item.productID.image],
          name: item.productID.name,
        },
        unit_amount: Math.round(item.totalPrice * 100),
      },
      quantity: item.quantity,
    }));

    const customer = {
      email: userInfo.email,
    };

    const res = await callStripeSession({
      line_items: createLineItems,
      customer,
      currency: "INR",
      shipping: {
        address: orderData.shippingAddress,
      },
    });

    if (res.success) {
      setIsOrderProcessing(true);
      sessionStorage.setItem("stripe", true);
      sessionStorage.setItem("orderData", JSON.stringify(orderData));

      const { error } = await stripe.redirectToCheckout({
        sessionId: res.id,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        toast.error("Failed to redirect to checkout. Please try again.");
        setLoading(false);
      }
    } else {
      toast.error(
        res.message || "Failed to create Stripe session. Please try again."
      );
      setLoading(false);
    }
  };

  let discountPercentage = 0;
  let totalPrice = 0;
  let discountAmount = 0;
  let finalPrice = 0;

  if (userCartData && userCartData.length > 0) {
    totalPrice = userCartData.reduce((total, cartItem) => {
      const itemTotalPrice = cartItem.discountPrice * cartItem.quantity;
      cartItem.totalPrice = itemTotalPrice;
      return total + itemTotalPrice;
    }, 0);

    discountPercentage = 20;
    discountAmount = (totalPrice * discountPercentage) / 100;
    finalPrice = totalPrice - discountAmount + 200;
  }

  const deleteCartProduct = async (getId) => {
    const res = await deleteFromCart(getId);
    extractGetAllCartItems();
    if (res.success) {
      toast.success("Product Removed From Cart");
    } else {
      toast.error("Failed to remove product");
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "undefined") {
      return price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      });
    } else {
      return "";
    }
  };

  if (orderSuccess) {
    return (
      <section className="flex items-center justify-center h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white">
              <div className="px-4 flex flex-col items-center py-6 sm:px-8 sm:py-10 gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 2 seconds !
                </h1>
                <p>or</p>
                <button
                  onClick={() => router.push("/orders")}
                  className="flex items-center justify-center rounded bg-indigo-500 px-5 py-2 text-sm text-white transition hover:bg-indigo-400"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#6366f1"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <p className="text-lg my-5 text-center md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
        Confirm your details, check product, and select shipping address
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
              <p className="mt-4">Your cart is empty</p>
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
                  {userCartData?.length > 0 && userAddress?.length > 0 ? (
                    <>
                      {userAddress.map((addr, index) => (
                        <div
                          onClick={() => handleAddressSelect(addr._id)}
                          className={`flex items-start w-full max-w-xs justify-between mb-4 mt-2 rounded-md bg-gray-100 p-3 cursor-pointer ${
                            addr._id === selectedAddress
                              ? "border border-green-400"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="flex capitalize flex-col w-full">
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
                      ))}
                      <Link href="/profile">
                        <p className="text-sm text-center text-gray-900 cursor-pointer hover:text-indigo-500">
                          Add New Address
                        </p>
                      </Link>
                    </>
                  ) : (
                    <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Please check if there are items in your cart and if you
                      have added an address in your profile.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={
                (userCartData && userCartData.length === 0) ||
                !selectedAddress ||
                loading
              }
              className="flex disabled:bg-indigo-300 items-center mt-8 justify-center rounded bg-indigo-500 w-full px-5 py-2 text-sm text-white transition hover:bg-indigo-400"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <span className="flex items-center">
                  Checkout <MdArrowRightAlt className="text-3xl ml-4" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
