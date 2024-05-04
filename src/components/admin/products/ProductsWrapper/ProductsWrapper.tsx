'use client';
import { FC, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DataTable from '@/components/UI/DataTable/DataTable';
import MyBtn from '@/components/UI/MyBtn/MyBtn';

import './ProductsWrapper.scss';

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface ProductsWrapperProps {
  data: any;
}

const ProductsWrapper: FC<ProductsWrapperProps> = ({ data }) => {
  const router = useRouter();
  // const { sendRequest, loading, error } = useApi();
  const [ isLux, setIsLux ] = useState('');

  const deleteProduct = (id: string) => {
    console.log(id);
  };

  const editProduct = useCallback((id: string) => {
    router.push(`products/update/${ id }`);
  }, [ router ]);

  const handleSelectChange = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setIsLux(value);

    const newUrl = new URL(window.location.href);
    const searchParams = newUrl.searchParams;
    value ? searchParams.set('isLux', value) : searchParams.delete('isLux');

    router.push(`${ newUrl.pathname }?${ searchParams.toString() }`)
  };

  const columns = useMemo(() => [
    {
      id: 'skus',
      headerName: 'SKU',
      width: 85,
      render: (item: any) => item.items[0]?.sku || '-',
    },
    {
      id: 'image',
      headerName: 'Image',
      width: 100,
      render: (item: any) => <Image src={ item.img } alt="Product"/>,
    },
    {
      id: 'name',
      headerName: 'Name',
      width: 120,
      render: (item: any) => item.translations[0]?.title || 'No name',
    },
    {
      id: 'price',
      headerName: 'Price',
      width: 85,
      render: (item: any) => item.items[0]?.prise || '0',
    },
    {
      id: 'old price',
      headerName: 'Old price',
      width: 85,
      render: (item: any) => item.items[0]?.oldPrise || '0',
    },
    {
      id: 'visited',
      headerName: 'Visited',
      width: 100,
      render: (item: any) => item.visited.toString(),
    },
    {
      id: 'saleCount',
      headerName: 'Sale Count',
      width: 100,
      render: (item: any) => item.saleCount.toString(),
    },
    {
      id: 'edit',
      headerName: 'Edit',
      width: 120,
      render: (item: any) => <MyBtn text={ 'Edit' } color={ 'attention' } click={ () => editProduct(item.id) }/>,
    },
    {
      id: 'delete',
      headerName: 'Delete',
      width: 120,
      render: (item: any) => <MyBtn text={ 'Delete' } color={ 'attention' } click={ () => deleteProduct(item.id) }/>,
    },
  ], []);

  // if (loading) {
  //   return <SpinnerFullScreen2/>;
  // }

  return (
    <>
      <div className="products-container">
        <div className="products-title">
          <div className="product-select">
            <select className="product-selectLuxury" value={ isLux } onChange={ handleSelectChange }>
              <option value="" selected>All products</option>
              <option value="true">Luxury</option>
              <option value="false">Not luxury</option>
            </select>
          </div>

          <div className="product-create">
            <Link href={ 'products/new-product' }>
              <button className="create-product-btn" type="button">Create product</button>
            </Link>
          </div>
        </div>
        <div className="products-wrapper">
          { data.data.length === 0 ? (
            <p>Немає продуктів для відображення.</p>
          ) : (
            <>
              <DataTable
                initialSelectedOptions={ columns }
                columns={ columns }
                data={ data.data || [] }
              />
            </>
          ) }
        </div>
      </div>
    </>
  );
};

export default ProductsWrapper;