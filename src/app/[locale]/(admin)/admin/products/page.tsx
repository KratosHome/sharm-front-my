import ProductsWrapper from "@/components/admin/products/ProductsWrapper/ProductsWrapper";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

export default function Products(
  {searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }
) {
  const page = searchParams["page"] ?? "1"
  return (
    <>
      <ProductsWrapper page={ page }/>
    </>
  );
};
