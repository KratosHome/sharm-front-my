"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import SpinnerFullScreen2 from "@/components/UI/Spinner/SpinnerFullScreen2";

import "./ProductsWrapper.scss";
import { useLocale } from "next-intl";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";
import styles from "@/components/admin/products/SingleProduct/SingleProductComponent.module.scss";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

interface ProductsWrapperProps {
  page: any;
}

const ProductsWrapper: FC<ProductsWrapperProps> = ({page}) => {
  const router = useRouter();
  const locale = useLocale();
  const {sendRequest, loading, error} = useApi();
  const [ products, setProducts ] = useState<Product[]>([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const [ dataFetched, setDataFetched ] = useState(false);
  const [ isLux, setIsLux ] = useState('');

  const limit = "10";
  const sort = "desc";
  const sortOrder = "createdAt";

  useEffect(() => {
    let urlParams = `?page=${ page }&limit=${ limit }&sort=${ sort }&sortOrder=${ sortOrder }`;
    if (isLux !== '') {
      urlParams += `&isLux=${ isLux }`;
    }

    const fetchProducts = async () => {
      const allProducts = await sendRequest(`products/${ locale }/${ urlParams }`, 'GET');
      setProducts(allProducts.data.data);
      setTotalPages(allProducts.data.totalPages || 0);
      setDataFetched(true);
    };

    fetchProducts();
  }, [ locale, isLux ]);

  const deleteProduct = async (id: string) => {
    try {
      await sendRequest(`products/${ id }`, 'DELETE');
      router.refresh();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const editProduct = (id: string) => {
    router.push(`products/update/${ id }`);
  }

  const handleSelectChange = (event: any) => {
    event.preventDefault();
    const value = event.target.value;
    setIsLux(value);
  };

  const columns = [
    {
      id: 'skus',
      headerName: 'SKU',
      width: 85,
      render: (item: any) => item.items[0]?.sku || "-",
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
      render: (item: any) => item.translations[0]?.title || "No name",
    },
    {
      id: 'price',
      headerName: 'Price',
      width: 85,
      render: (item: any) => item.items[0]?.prise || "0",
    },
    {
      id: 'old price',
      headerName: 'Old price',
      width: 85,
      render: (item: any) => item.items[0]?.oldPrise || "0",
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
      render: (item: any) => <MyBtn text={ "Edit" } color={ "attention" } click={ () => editProduct(item.id) }/>,
    },
    {
      id: 'delete',
      headerName: 'Delete',
      width: 120,
      render: (item: any) => <MyBtn text={ "Delete" } color={ "attention" } click={ () => deleteProduct(item.id) }/>,
    },
  ];

  if (loading) {
    return <SpinnerFullScreen2/>;
  }

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
            <Link href="products/new-product">
              <button className="create-product-btn" type="button">Create product</button>
            </Link>
          </div>
        </div>
        <div className="products-wrapper">
          { dataFetched && products.length === 0 ? (
            <p>Немає продуктів для відображення.</p>
          ) : (
            <>
              <DataTable
                initialSelectedOptions={ columns }
                columns={ columns }
                data={ products }
              />
              <PaginationControl totalPages={ totalPages }/>
            </>
          ) }
        </div>
      </div>
    </>

  );
};

export default ProductsWrapper;