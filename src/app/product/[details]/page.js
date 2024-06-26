import { productById } from "@/controller/product";
import ProductDetails from "./../../../components/ProductDetails/index";

export default async function Product_Details({ params }) {
  const productDetailsData = await productById(params.details);
  return <ProductDetails product={productDetailsData.data} />;
}
