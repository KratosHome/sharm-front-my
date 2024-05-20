import BaseSlider from '@/components/UI/BaseSlider/BaseSlider';

import ProductCard from '../Product/ProductCard/ProductCard';
import {products} from '@/mokData/sliderProducts.js';
import { FC } from 'react';

type Props = {}

const getProductForSlider = async () => {
  // const res = await fetch('https://api.example.com/...')

  // if (!res.ok) {
  //     throw new Error('Failed to fetch data')
  // }
  
  // return res.json()
  return new Promise<IProduct[]>(resolve => setTimeout(() => resolve(products), 1000))
}

const ProductSlider: FC<Props> = async ({}) => {
  const data = await getProductForSlider();
  const slides = {
    isMobile: 2, 
    isTablet: 3,
    isLaptop: 4,
    isDesktop: 5
  }
  return (
    <BaseSlider slides={slides} title={'new_arrivals'}>
      {data.map(product => (<ProductCard key={product.id} product={product} type={'slider-long-img'} hasBacklight={true}/>))}
    </BaseSlider>
  )
}

export default ProductSlider;