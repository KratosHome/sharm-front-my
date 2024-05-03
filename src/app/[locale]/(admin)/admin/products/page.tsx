import ProductsWrapper from '@/components/admin/products/ProductsWrapper/ProductsWrapper';
import { getAction } from '@/actions/getAction';
import { useLocale } from 'next-intl';

import PaginationControl from '@/components/UI/PaginationControl/PaginationControl';

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

export const dynamic = 'force-dynamic'
export default async function Products(
  { searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }
) {
  console.log('page >>>>>>>>', searchParams['page']);
  console.log('limit >>>>>>>>', searchParams['limit']);
  console.log('sort >>>>>>>>', searchParams['sort']);
  console.log('sortOrder >>>>>>>>', searchParams['sortOrder']);
  console.log('isLux >>>>>>>>', searchParams['isLux']);

  const page = searchParams['page'] ?? '1'
  const limit = searchParams['limit'] ?? '10';
  const sort = searchParams['sort'] ?? 'desc';
  const sortOrder = searchParams['sortOrder'] ?? 'createdAt';
  const isLux = searchParams['isLux'] ?? 'true';
  const locale = useLocale();

  let urlParams = `sort=${ sort }&sortOrder=${ sortOrder }&isLux=${ isLux }`;

  const allProducts = await getAction(`products/${ locale }`, page.toString(), limit.toString(), urlParams)
  const totalPages = allProducts.totalPages

  const handleLux = (value: string) => {
    console.log('handleLux', value);
  }

  const handleProductId = (value: string) => {
    console.log('handleProductId', value);
  }

  return (
    <>
      {/* сделать получение переменной isLux из компонента ProductsWrapper, и сделать*/ }
      {/* вызов c новым значением isLux чтобы получить новый allProducts*/ }
      <ProductsWrapper data={ allProducts }/>
      <PaginationControl totalPages={ totalPages }/>
    </>
  );
};
