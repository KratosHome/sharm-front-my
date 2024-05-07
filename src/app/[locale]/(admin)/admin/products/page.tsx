import { useLocale } from 'next-intl';
import { revalidatePath } from 'next/cache';
import { getAction } from '@/actions/getAction';
import ProductsWrapper from '@/components/admin/products/ProductsWrapper/ProductsWrapper';
import PaginationControl from '@/components/UI/PaginationControl/PaginationControl';

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
  const isLux = searchParams['isLux'] ?? '';
  const locale = useLocale();

  let urlParams = `sort=${ sort }&sortOrder=${ sortOrder }&isLux=${ isLux }`;

  const allProducts = await getAction(`products/${ locale }`, page.toString(), limit.toString(), urlParams)
  const totalPages = allProducts?.totalPages
  revalidatePath(urlParams);

  console.log('allProducts', allProducts);

  return (
    <>
      <ProductsWrapper data={ allProducts } getData={
        async () => {
          'use server'
          return await allProducts;
        }
      }/>
      <PaginationControl totalPages={ totalPages || 0 }/>
    </>
  );
};
