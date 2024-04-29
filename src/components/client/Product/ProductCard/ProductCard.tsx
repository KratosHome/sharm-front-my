import Image from 'next/image';
import { useTranslations } from 'next-intl';

import StarRating from '@/components/general/RaitingStars/RatingStars';
import HeartSvg from '@/components/svg/HeartSvg'
import MyBtn from '@/components/UI/MyBtn/MyBtn';

import './ProductCard.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {product: IProduct;}

export default function ProductCard({product}: Props) {
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
        <li className='product-card'>
            <div className="product-card-favorites"><HeartSvg /></div>
            <div className="product-card-img">
                <Link href={url}>
                    <Image src={img} alt={title} fill={true}/>
                </Link>
            </div>
            <div className="product-card-content">
                <div className="product-card-content-top">
                    <div className="product-card-title">
                        <Link href={url}>
                            {title}
                        </Link>    
                    </div>
                    <div className="product-card-subTitle">{subTitle}</div>
                </div>
                <div className="product-card-content-middle">
                    <div className="product-card-rating">
                        <StarRating rating={rating} />
                        <span>(<Link href="#">{votes}</Link>)</span>
                    </div>
                    <div className="product-card-price">₴ {price}{oldPrice ? <span className='product-card-oldprice'>₴ {oldPrice}</span>: null}</div>
                </div>
                <div className="product-card-content-bottom">
                    <MyBtn text={t("add_to_cart")} color='primary'/>
                </div>
            </div>
        </li>
    )
}