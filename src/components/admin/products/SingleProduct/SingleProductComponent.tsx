'use client';
import { FC, useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import MyInput from '@/components/general/MyInput/MyInput';
import MyBtn from '@/components/UI/MyBtn/MyBtn';
import { useApi } from '@/hooks/useApi';

import styles from './SingleProductComponent.module.scss';

interface ProductState {
  id?: string;
  isLux: boolean;
  img: string;
  url: string;
  items: Item[];
  translations: Translation[];
}

interface Item {
  name: string;
  sku: string;
  prise: string;
  oldPrise: string;
  count: string;
  color: string;
  img: string;
}

interface Translation {
  lang: string;
  title: string;
  subTitle: string;
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}

interface ApiResponse<T> {
  ok: boolean; 
  data?: T;
  error?: string;
}

const defaultProduct: ProductState = {
  isLux: false,
  img: '',
  url: '',
  items: [],
  translations: [],
}

interface SingleProductComponentProps {
  productId?: string;
}

const Translation = { lang: 'en', title: '', subTitle: '', description: '', shortDescription: '', metaTitle: '', metaKeywords: '', metaDescription: '' };

const Item = { name: '', sku: '', prise: '', oldPrise: '', count: '', color: '', img: '' };

const SingleProductComponent: FC<SingleProductComponentProps> = ({ productId }) => {
  const router = useRouter();
  const locale = useLocale();
  const { sendRequest } = useApi();
  const [productData, setProductData] = useState<ProductState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<ProductState>({
    defaultValues: productData || defaultProduct,
  });

  useEffect(() => {
    if (!productId) return;
  
    const fetchData = async () => {
      try {
        const response = await sendRequest(`products/${locale}/${productId}`, 'GET');
        console.log(response.data);
        setProductData(response.data);
        reset(response.data);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to fetch product data');
      }
    };
  
    fetchData();
    // adding reset hook in this case leads to an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, locale]);

  const { fields: itemFields, append: appendItem } = useFieldArray<any>({
    control,
    name: "items"
  });

  const { fields: translationFields, append: appendTranslation } = useFieldArray<any>({
    control,
    name: "translations"
  });

  const onSubmit = (data: any) => {
    const apiEndpoint = productData ? `products/${locale}/${productData.id}` : 'products';
    const method = productData ? 'PATCH' : 'POST';


    console.log('Submitted Data:', data);
    sendRequest(apiEndpoint, method, data)
      .then(response => {
        if (response.data) {
          router.push('products');
      } else {
        throw new Error(`Failed to ${productData ? 'update' : 'create'} product`);
      }
    })
    .catch(err => {
      setError(err.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      <section className={styles.section}>
        <h3 className={styles.title}>Main fields</h3>
        <MyInput type="checkbox" label="Luxury" {...register('isLux')} />
        <MyInput type="text" label="Image" {...register('img')} />
        <MyInput type="text" label="URL" {...register('url')} />
      </section> 

      <section className={styles.section}>
        <h3 className={styles.title}>Translations</h3>
        {translationFields.map((field, index) => (
          <div className={styles.formTranslations} key={field.id}>
            { !productData && 
              <select className={styles.selectTranslation} {...register(`translations.${index}.lang`)}>
                <option value="en">EN</option>
                <option value="ua">UA</option>
                <option value="ru">RU</option>
              </select>
            }
            <MyInput type="text" label="Title" {...register(`translations.${index}.title`)} />
            <MyInput type="text" label="Subtitle" {...register(`translations.${index}.subTitle`)} />
            <MyInput type="text" label="Description" {...register(`translations.${index}.description`)} />
            <MyInput type="text" label="Short description" {...register(`translations.${index}.shortDescription`)} />
            <MyInput type="text" label="Meta Title" {...register(`translations.${index}.metaTitle`)} />
            <MyInput type="text" label="Meta Keywords" {...register(`translations.${index}.metaKeywords`)} />
            <MyInput type="text" label="Meta Description" {...register(`translations.${index}.metaDescription`)} />
          </div>
        ))}
        { !productData && 
          <MyBtn text="Add translation" color="primary" click={() => appendTranslation(Translation)} type="button" />
        }
        
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>Products</h3>
        {itemFields.map((item, index) => (
          <div className={styles.formItems} key={item.id}>
            <MyInput type="text" label="Name" {...register(`items.${index}.name`)} />
            <MyInput type="text" label="SKU" {...register(`items.${index}.sku`)} />
            <MyInput type="number" label="Price" {...register(`items.${index}.prise`)} />
            <MyInput type="number" label="Old price" {...register(`items.${index}.oldPrise`)} />
            <MyInput type="number" label="Count" {...register(`items.${index}.count`)} />
            <MyInput type="text" label="Color" {...register(`items.${index}.color`)} />
            <MyInput type="text" label="Image" {...register(`items.${index}.img`)} />
          </div>
        ))}
        { !productData && 
          <MyBtn text="Add product" color="primary" click={() => appendItem(Item)} type="button" />
        }
      </section>

      <MyBtn text={productData ? "Update Product" : "Create Product"} color="primary" type="submit" />
    </form>
  );
};

export default SingleProductComponent;
