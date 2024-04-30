'use client'
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from 'react'

const Admin = () => {
  const router = useRouter();
  const {isLoggedIn  , userInfo} = useContext(GlobalContext);

  useEffect(() => {
    if (!isLoggedIn && userInfo?.role !== "Seller") {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen px-5"'>Admin</div>
  )
}

export default Admin