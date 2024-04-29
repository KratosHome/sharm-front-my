import React from 'react'
import {products} from '@/mokData/sliderProducts.js';
import ProductCard from '../ProductCard/ProductCard';

type Props = {}

const getProductForSlider = async () => {
    return new Promise<IProduct[]>(resolve => setTimeout(() => resolve(products), 1000))
}
export default async function SliderList({}: Props) {
    const data = await getProductForSlider();

    return (
        <>
            {
                data.map(product => (<ProductCard key={product.id} product={product}/>))
            }
        </>
    )
}