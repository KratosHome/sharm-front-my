import BaseSlider from '@/components/UI/BaseSlider/BaseSlider'
import React from 'react'
import {products} from '@/mokData/sliderProducts.js';
import ProductCard from '../Product/ProductCard/ProductCard';

type Props = {}
const getProductForSlider = async () => {
    return new Promise<IProduct[]>(resolve => setTimeout(() => resolve(products), 1000))
  }
export default async function ProductSlider({}: Props) {
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