"use client";
import FeatureCards from "@/components/FeatureCards";
import ImageSlideShow from "./../components/ImageSlideShow/index";
import AllProoductListing from "@/components/AllProductsListing";
import img1 from "../Images/img1.jpg";
import img2 from "../Images/img2.jpg";
import img3 from "../Images/img3.jpg";

export default function Home() {
  const images = [img1, img2, img3];
  return (
    <div className="bg-gray-100 container mt-[43px] md:mt-0 mx-auto">
      <ImageSlideShow images={images} />
      <FeatureCards />
      <AllProoductListing />
    </div>
  );
}
