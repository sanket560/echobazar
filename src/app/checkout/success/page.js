"use client";
import { GlobalContext } from "@/context";
import { createNewOrder } from "@/controller/order";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { isLoggedIn, userInfo, userCartData, extractGetAllCartItems } =
    useContext(GlobalContext);

  const pathname = usePathname();
  const isSuccess = pathname.includes("success");
  const router = useRouter();

  useEffect(() => {
    const createFinalOrder = async () => {
      const isStripe = JSON.parse(sessionStorage.getItem("stripe"));
      if (isStripe && isSuccess && userCartData && userCartData.length > 0) {
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
          user: userInfo._id,
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

        const res = await createNewOrder(createFinalOrderData);
        if (res.success) {
          extractGetAllCartItems();
          toast.success(res.message);
        } else {
          extractGetAllCartItems();
          toast.error(res.message);
        }
      }
    };
    createFinalOrder();
  }, [isSuccess, userCartData, extractGetAllCartItems]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
    setTimeout(() => {
      router.push("/orders");
    }, 5000);
  }, [router]);

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
            <h1 className="font-bold text-lg">
              Your payment is successful and you will be redirected to the
              orders Page in 5 seconds!
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
