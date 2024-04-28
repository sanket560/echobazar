import { productById } from "@/services/product";
import ProductDetails from "./../../../components/ProductDetails/index";

export default async function Product_Details({ params }) {
  const productDetailsData = await productById(params.details);
  return (
    <div className="">
      <ProductDetails product={productDetailsData.data} />
    </div>
  );
}
