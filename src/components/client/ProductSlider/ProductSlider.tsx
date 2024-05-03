'use client';
import { useRef, useState } from "react";
import { gsap, Power3 } from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";
import { useTranslations } from "next-intl";

import { ArrowLong } from "@/components/svg/Arrow/Arrow-long";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import ProductCard from "../Product/ProductCard/ProductCard";

import './ProductSlider.scss';

gsap.registerPlugin(Draggable);

type Props = { title: string; data: IProduct[]; type: 'square-img' | 'long-img' }

export default function ProductSlider({ title, data, type }: Props) {
    const t = useTranslations('UI');

    const backBtn = useRef<HTMLButtonElement | null>(null);
    const forwardBtn = useRef<HTMLButtonElement | null>(null);
    const sliderContainer = useRef<HTMLUListElement | null>(null);
    const sliderWrapper = useRef<HTMLDivElement | null>(null);

    const size = useWindowWidth();
    const basicSliderQuantity = size > 1200 ? 5 :
        size > 1024 ? 4 :
            size > 768 ? 3 : 2;

    const [offset, setOffset] = useState<number>(0);
    const gap = sliderContainer.current && parseFloat(window.getComputedStyle(sliderContainer.current).getPropertyValue("gap"));
    const itemWidth = sliderContainer.current && sliderContainer.current.children[0].getBoundingClientRect().width;
    const wrapperWidth = sliderWrapper.current && sliderWrapper.current.getBoundingClientRect().width;
    const l = data.length;
    const dotsLength =(Math.ceil(l / basicSliderQuantity) >= 5 ? 5 : 4);
    
    console.log(gap)

    useGSAP(() => {
        if (!itemWidth || !gap) return;
        const shift = (itemWidth + gap) * offset;

        gsap.to(sliderContainer.current, {
            x: -(shift),
            ease: Power3.easeOut,
            duration: 1,
        });

    }, { dependencies: [offset, size] });

    useGSAP(() => {

        if (size > 1023) return;

        let startX = 0;
        Draggable.create(sliderContainer.current, {
            type: "x",
            onDragStart: function (e) {
                startX = e.clientX || e.touches[0].clientX;
            },
            onDragEnd: function (e) {
                if (!itemWidth || !gap) return;

                const dragDistance =
                    e.clientX - startX || e.touches[0].clientX - startX;

                if (offset < basicSliderQuantity && dragDistance > 0) {
                    gsap.to(sliderContainer.current, {
                        x: 0,
                        ease: Power3.easeOut,
                        duration: 1,
                    });
                    setOffset(0);
                } else if (offset + +(dragDistance < 0) * basicSliderQuantity > data.length - basicSliderQuantity) {
                    gsap.to(sliderContainer.current, {
                        x: - (data.length - basicSliderQuantity) * (itemWidth + gap),
                        ease: Power3.easeOut,
                        duration: 1,
                    });
                    setOffset(data.length - basicSliderQuantity);

                } else {
                    if (dragDistance > 0) {
                        handleArrowClick(-basicSliderQuantity);
                    } else if (dragDistance < 0) {
                        handleArrowClick(basicSliderQuantity);
                    }
                }
            },
        });
    }, { dependencies: [offset, size] });

    const handleArrowClick = (val: number) => {
        if (offset + val < 0 || offset + val > data.length - basicSliderQuantity) return
        setOffset(offset + val);
    }

    return (
        <section className={`product-slider${type === 'square-img' ? 'square' : ''}`}>
            <div className="product-slider-header">
                <h3 className="product-slider-title">{t(title)}</h3>
                <div className="product-slider-navigation">
                    {size >= 1024 ? <>
                        <button
                            className="arrow-back-button"
                            title="arrow-control"
                            ref={backBtn}
                            disabled={offset === 0}
                            onClick={() => handleArrowClick(-1)}>
                            <ArrowLong className="arrow-back" isMobile={false} />
                        </button>
                        <button
                            className="arrow-forward-button"
                            title="arrow-control"
                            ref={forwardBtn}
                            disabled={offset === data.length - basicSliderQuantity}
                            onClick={() => handleArrowClick(1)}>
                            <ArrowLong className="arrow-forward" isMobile={false} />
                        </button>
                    </> : <div className="slider-dots">
                            {Array(dotsLength).fill('').map((item, index) => (
                                <div key={index}
                                    className={`slider-dot ${index === Math.ceil(offset /basicSliderQuantity) ? "active" : ""}`}
                                />
                            ))}
                        </div>}
                </div>
            </div>
            <div className="product-slider-wrapper" ref={sliderWrapper}>
                <ul className="product-slider-container" ref={sliderContainer}>
                    {data.map(product => (<ProductCard key={product.id} product={product} type={`slider-${type}`} hasBacklight={true}/>))}
                </ul>
            </div>
        </section>
    )
}