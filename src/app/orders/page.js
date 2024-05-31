"use client";
import { GlobalContext } from "@/context";
import { getAllOrderForUser } from "@/controller/order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Page = () => {
  const { userInfo, isLoggedIn } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const router = useRouter();
  const id = userInfo?._id;

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

  const getAllUserOrdersData = useCallback(async () => {
    setLoading(true);
    const res = await getAllOrderForUser(id);
    if (res.success) {
      setUserOrders(res.data);
    } else {
      console.log(res.message);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      router.push('/');
    }

    if (id) {
      getAllUserOrdersData();
    }
  }, [id, isLoggedIn, router, getAllUserOrdersData]);

  return (
    <section className="mt-8">
      <div className="container px-5 py-10 mx-auto">
        {loading ? (
          <>
            <div className="hidden md:block">
              <Skeleton width={1480} count={2} height={350} />
            </div>
            <div className="block md:hidden">
              <Skeleton width={350} count={2} height={350} />
            </div>
          </>
        ) : userOrders.length > 0 ? (
          userOrders.map((order, orderIndex) => (
            <div key={orderIndex} className="mb-6 bg-white rounded-md">
              <h1 className="pt-10 text-3xl pb-2 pl-6 text-black">
                Order #{order._id}
              </h1>
              <div className="flex border-b m-5 pb-3">
                <div className="pl-2">
                  <p className="text-sm">
                    <span className="font-semibold text-black mr-1">
                      Order Placed on:
                    </span>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-black mr-1">Payment Method: </span>
                    {order.paymentMethod}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-black mr-1">Order Status:</span>
                    {order.isProcessing
                      ? "Processing the order wait till seller accept"
                      : "Completed"}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-black mr-1">Total Price: </span>
                    {formatPrice(order.totalPrice)}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-black mr-1">Paid:</span>
                    {order.isPaid ? "Yes" : "No"}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 pl-6">
                  <h3 className="text-lg font-semibold text-black">
                    Shipping Address:
                  </h3>
                  <p className="text-sm">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                    <br />
                    {order.shippingAddress.country} -{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
              {order.orderItems.map((orderItem, itemIndex) => (
                <div
                  key={itemIndex}
                  className="mt-4 px-3 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  <Link href={`/product/${orderItem.product._id}`}>
                    <div className="flex items-center justify-center pb-10 w-full md:w-40">
                      <Image
                        className="w-full md:w-32 mix-blend-multiply"
                        src={orderItem.product.image}
                        alt={orderItem.product.name}
                        width={200}
                        height={300}
                      />
                    </div>
                  </Link>
                  <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-black">
                      {orderItem.product.name}
                    </h3>
                    <div className="flex justify-around space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        {formatPrice(orderItem.product.discountPrice)}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-black">
                        Quantity: {orderItem.qty}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-black">
                        {formatPrice(
                          orderItem.qty * orderItem.product.discountPrice
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="mt-4 md:mt-20 text-center">You don&apos;t have any orders</p>
        )}
      </div>
    </section>
  );
};

export default Page;
