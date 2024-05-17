"use client";
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import StarRating from '@/components/general/RaitingStars/RatingStars';
import HeartSvg from '@/components/svg/HeartSvg'
import MyBtn from '@/components/UI/MyBtn/MyBtn';

import './ProductCard.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {
    product: IProduct; 
    type: "prod-list" | "slider-long-img" | "slider-square-img";
    hasBacklight: boolean;
};

export default function ProductCard({product, type, hasBacklight}: Props) {
    const {locale} = useParams();
    const {img, rating, votes, url, items: [{
        price,
        oldPrice
    }], translations } = product;
    const {
        title,
        subTitle
    } = translations.filter(item => item.lang === locale)[0];
    const t = useTranslations("UI");

    return (
        <li className={"product-card"}>
            <button className={`product-card-favorites${type !== "slider-long-img" ? ' square' : ''}`}><HeartSvg /></button>
            <div className={`product-card-img${type !== "slider-long-img" ? ' square' : ''}`}>
                <Link href={url}>
                    <Image src={img} alt={title} fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                </Link>
            </div>
            <div className={`product-card-content${hasBacklight ? ' backlight' : ''}`}>
                <div className="product-card-content-top">
                    <h5 className="product-card-title">
                        <Link href={url}>
                            {title}
                        </Link>    
                    </h5>
                    <p className="product-card-subtitle">{subTitle}</p>
                </div>
                <div className="product-card-content-middle">
                    <span className="product-card-rating">
                        <StarRating rating={rating} />
                        {/* <span>(<Link href="#">{votes}</Link>)</span> */}
                        <span>({votes})</span>
                    </span>
                    <span className="product-card-price">₴ {price}{oldPrice ? <span className='product-card-oldprice'>₴ {oldPrice}</span>: null}</span>
                </div>
                {type === "prod-list" ? <div className="product-card-content-bottom">
                    <MyBtn text={t("add_to_cart")} color='primary'/>
                </div> : null}
            </div>
        </li>
    )
}