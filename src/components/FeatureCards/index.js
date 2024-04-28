import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineSupportAgent } from "react-icons/md";

const FeatureCards = () => {
  return (
    <div className="container px-2 md:px-5 py-10 mx-auto">
      <div className="flex flex-wrap gap-2 justify-around md:justify-evenly">
        <div className="w-36 md:w-80">
          <div className="flex rounded-lg h-full bg-white p-4 md:p-8 flex-col">
            <div className="flex items-center justify-center flex-col md:flex-row mb-3">
              <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                <TbTruckDelivery className="text-xl" />
              </div>
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Free Delivery
                </h2>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  For First 26 Orders
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-36 md:w-80">
          <div className="flex rounded-lg h-full bg-white p-4 md:p-8 flex-col">
            <div className="flex items-center justify-center flex-col md:flex-row mb-3">
              <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                <FaIndianRupeeSign className="text-xl" />
              </div>
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Return &amp; Refund
                </h2>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Money back guarantee
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-36 md:w-80">
          <div className="flex rounded-lg h-full bg-white p-4 md:p-8 flex-col">
            <div className="flex items-center justify-center flex-col md:flex-row mb-3">
              <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                <CiDiscount1 className="text-xl" />
              </div>
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Discount
                </h2>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Get discount till 70 %
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="w-36 md:w-80">
          <div className="flex rounded-lg h-full bg-white p-4 md:p-8 flex-col">
            <div className="flex items-center justify-center flex-col md:flex-row mb-3">
              <div className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                <MdOutlineSupportAgent className="text-xl" />
              </div>
              <div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Support 24/7
                </h2>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Customer Support
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
