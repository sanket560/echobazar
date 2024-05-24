"use client";
import { GlobalContext } from "@/context";
import { getAllOrderForUser } from "@/controller/order";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const page = () => {
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

  async function getAllUserOrdersData() {
    setLoading(true);
    const res = await getAllOrderForUser(id);
    if (res.success) {
      setUserOrders(res.data);
    } else {
      console.log(res.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      router.push('/');
    }

    if (id) {
      getAllUserOrdersData();
    }
  }, [id,isLoggedIn,router]);

  return (
    <section className="text-gray-600 body-font mt-10">
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
              <div className="flex pl-6 pt-10 gap-3">
                <p className="text-sm">
                  <span className="font-semibold mr-1"> Order Placed on:</span>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold mr-1">Payment Method: </span>

                  {order.paymentMethod}
                </p>
                <p className="text-sm">
                  <span className="font-semibold mr-1">Order Status:</span>
                  {order.isProcessing
                    ? "Processing the order wait till seller accept"
                    : "Completed"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold mr-1">Total Price: </span>

                  {formatPrice(order.totalPrice)}
                </p>
                <p className="text-sm">
                  <span className="font-semibold mr-1">Paid:</span>
                  {order.isPaid ? "Yes" : "No"}
                </p>
              </div>
              {order.orderItems.map((orderItem, itemIndex) => (
                <div
                  key={itemIndex}
                  className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                >
                  <Link href={`/product/${orderItem.product._id}`}>
                    <div className="pb-4 flex items-center justify-center md:pb-8 w-full md:w-40">
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
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      {orderItem.product.name}
                    </h3>
                    <div className="flex justify-around space-x-8 items-start w-full">
                      <p className="text-base xl:text-lg leading-6">
                        {formatPrice(orderItem.product.discountPrice)}
                      </p>
                      <p className="text-base xl:text-lg leading-6 text-gray-800">
                        Quantity: {orderItem.qty}
                      </p>
                      <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
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
          <p className="mt-4 md:mt-20 text-center">Your dont any orders</p>
        )}
      </div>
    </section>
  );
};

export default page;
