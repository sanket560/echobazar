"use client";
import { GlobalContext } from "@/context";
import { addNewAddress, deleteAddress, fetchAllAddresses } from "@/controller/address";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const ProfilePage = () => {
  const { userInfo , isLoggedIn } = useContext(GlobalContext);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const router = useRouter();
  
  const handleAddAddressClick = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = {
      name,
      address,
      country,
      city,
      state,
      postalCode,
      userID: userInfo._id,
    };

    const result = await addNewAddress(formData);
    setIsLoading(false);
    getUserAddress();
    setName("");
    setAddress("");
    setCountry("");
    setCity("");
    setState("");
    setPostalCode("");
    if (result.success) {
      toast.success(result.message);
      setIsFormVisible(false);
    } else {
      toast.error(result.message);
    }
  };

  const isValidForm = () => {
    return (
      name.trim() !== "" &&
      address.trim() !== "" &&
      country.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      postalCode.trim() !== ""
    );
  };

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

  const deleteUserAddress = async (getId) => {
    const res = await deleteAddress(getId);
    getUserAddress();
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="bg-white md:w-[800px] mt-20 mb-10 mx-auto shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-900">
          Details and information about user.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div>
          <div className="px-4 py-2 sm:px-6">
            <p className="text-md font-medium text-gray-900">Full name : </p>
            <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.name}
            </p>
          </div>
          <div className="px-4 pb-2 sm:px-6">
            <p className="text-md font-medium text-gray-900">
              Email Address :{" "}
            </p>
            <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.email}
            </p>
          </div>
          <div className="px-4 pb-2 sm:px-6">
            <p className="text-md font-medium text-gray-900">Role : </p>
            <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {userInfo?.role}
            </p>
          </div>
          <div className="px-4 pb-2 sm:px-6">
            <p className="text-md font-medium text-gray-900">
              Shipping Addresses
            </p>
            {userAddress?.length > 0 ? (
              userAddress.map((addr, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between mb-4 mt-2 rounded-md bg-gray-100 p-3"
                >
                  <div className="flex capitalize flex-col">
                    <p className="text-sm text-gray-900">
                      Name of recipient: {addr.name}
                    </p>
                    <p className="text-sm text-gray-900">
                      Address: {addr.address}
                    </p>
                    <p className="text-sm text-gray-700">City: {addr.city}</p>
                    <p className="text-sm text-gray-700">State: {addr.state}</p>
                    <p className="text-sm text-gray-700">
                      Country: {addr.country}
                    </p>
                    <p className="text-sm text-gray-700">
                      Pincode: {addr.postalCode}
                    </p>
                  </div>
                  <button onClick={() => deleteUserAddress(addr._id)} className="flex-shrink-0 ml-4">
                    <MdDelete className="text-red-600 text-xl" />
                  </button>
                </div>
              ))
            ) : (
              <>
                <div>
                  <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    You have not added an address.
                  </p>
                </div>
              </>
            )}
            <button
              onClick={handleAddAddressClick}
              className="mt-2 mb-4 bg-indigo-500 text-white px-4 focus:outline-none py-2 rounded"
            >
              Add Address
            </button>
          </div>
        </div>
      </div>

      {isFormVisible && (
        <div className="px-6 py-8 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name of recipient
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Pincode
              </label>
              <input
                id="postalCode"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1 block w-full sm:text-sm border-b-2 py-1.5 px-2 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!isValidForm() || isLoading}
              className="disabled:opacity-50 inline-flex items-center px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                "Save Address"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;