import React from 'react'
import {getTranslations, getLocale} from 'next-intl/server';

import {bannerPromoData} from '@/mokData/promoBanner';
import Image from 'next/image';
import Link from 'next/link';
import './PromoBanner.scss';
type Props = {promoPosition: 'top' | 'bottom'}

const getPromoBanners = async () => {
    // const res = await fetch('https://api.example.com/...')
 
 
    // if (!res.ok) {
    //     throw new Error('Failed to fetch data')
    // }
    
    // return res.json()
    
    return new Promise<IBannerPromo[]>(resolve => setTimeout(() => resolve(bannerPromoData), 1000))
}


export default async function PromoBanner({promoPosition}: Props) {
    const t = await getTranslations('UI');
    const locale = await getLocale();

    const bannersData = await getPromoBanners();
    const bannersForView = promoPosition === 'top' ? bannersData.slice(0, 2) : bannersData.slice(2);
    return (
        <section className='promo-banners'>
            <div className="promo-banners-wrapper">
                {bannersForView.map(banner => (
                    <div key={banner.id} className="promo-banner">
                        <div className="promo-banner-content">
                            <div className="promo-banner-title">{banner.translations.filter(item => item.lang === locale)[0].title}</div>
                            <div className="promo-banner-description">{banner.translations.filter(item => item.lang === locale)[0].description}</div>
                            <Link className="promo-banner-button" href={banner.link}>{t('visit')}</Link>
                        </div>
                        <Image 
                            className='promo-banner-image'
                            src={banner.image} 
                            fill 
                            alt='banner background' 
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            />
                    </div>
                ))}
            </div>
        </section>
    )
}

