"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import DataTable from "@/components/UI/DataTable/DataTable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";


import "./ProductsWrapper.scss";
import { useLocale } from "next-intl";
import PaginationControl from "@/components/UI/PaginationControl/PaginationControl";

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

  const limit = "10";
  const isLux = true;
  const sort = "desc";
  const sortOrder = "createdAt";
  const additionalParams = `?page=${ page }&limit=${ limit }&isLux=${ isLux }&sort=${ sort }&sortOrder=${ sortOrder }`;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await sendRequest(`products/${ locale }/${ additionalParams }`, 'GET');
      setProducts(allProducts.data.data);
      setTotalPages(allProducts.data.totalPages || 0);
    };

    fetchProducts();
  }, [ locale ]);

  const deleteProduct = async (id: string) => {
    try {
      await sendRequest(`products/${ id }`, 'DELETE');
      router.refresh();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  if (!products || products?.length === 0) {
    return <p>Немає продуктів для відображення.</p>;
  }

  const editProduct = (id: string) => {
    router.push(`products/update/${ id }`);
  }

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

  return (
    <>
      <div className="products-container">
        <div className="products-title">
          <div className="product-create">
            <Link href={ "products/new-product" }>
              <button className="create-product-btn" type="button">Create product</button>
            </Link>
          </div>
        </div>

        <div className="products-wrapper">
          <DataTable
            initialSelectedOptions={ columns }
            columns={ columns }
            data={ products || [] }
          />
        </div>
      </div>

      <PaginationControl
        totalPages={ totalPages }
      />
    </>

  );
};

export default ProductsWrapper;