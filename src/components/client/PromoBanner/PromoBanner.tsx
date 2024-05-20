import Link from 'next/link';
import Image from 'next/image';
import {getTranslations, getLocale} from 'next-intl/server';

import ClientWrapperForButtonAnimation from './AnimatedBtn';

import './PromoBanner.scss';

import {bannerPromoData} from '@/mokData/promoBanner';
import { FC } from 'react';

type PromoBannerProps = {position: 'top' | 'bottom'}

const getPromoBanners = async (position: 'top' | 'bottom') => {
    // const res = await fetch('https://api.example.com/...')
 
    // if (!res.ok) {
    //     throw new Error('Failed to fetch data')
    // }
    
    // return res.json()
    
    return new Promise<IBannerPromo[]>(resolve => setTimeout(() => resolve(bannerPromoData.filter(b => b.position === position)), 1000))
}


const PromoBanner: FC<PromoBannerProps> = async ({position}) => {
    const t = await getTranslations('UI');
    const locale = await getLocale();

    const banners = await getPromoBanners(position);
    return (
        <section className="promo-banners">
            <ClientWrapperForButtonAnimation>
                {banners.map(banner => (
                    <div key={banner.id} className="promo-banner">
                        <div className="promo-banner-content">
                            <div className="promo-banner-title">{banner.translations.filter(item => item.lang === locale)[0].title}</div>
                            <div className="promo-banner-description">{banner.translations.filter(item => item.lang === locale)[0].description}</div>
                            <button className="promo-banner-button" type='button'>
                                <Link  href={banner.link}>{t('visit')}</Link>
                            </button>
                        </div>
                        <Image 
                            className='promo-banner-image'
                            src={banner.image} 
                            fill 
                            alt='banner background' 
                            sizes='(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw'
                            />
                    </div>
                ))}
            </ClientWrapperForButtonAnimation>
        </section>
    )
}

export default PromoBanner;