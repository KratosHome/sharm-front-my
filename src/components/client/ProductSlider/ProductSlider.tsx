'use client';
import { useRef, useState } from "react";
import { gsap } from "gsap";
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
    
    const dotsLength = Math.ceil(data.length / basicSliderQuantity) >= 5 ? 5 : 4;

    const getResponsiveXValues = (amount: number, i: number) => {
        switch (amount) {
            case 2:
                return i === 0 ? -300 : i === 1 ? 300 : 0;
            case 3:
                return i === 0 ? -300 : i === 2 ? 300 : 0;
            case 4:
                return i === 0 ? -400 : i === 1 ? -200 : i === 2 ? 200 : i === 3 ? 400 : 0;
            case 5:
                return i === 0 ? -300 : i === 1 ? -150 : i === 3 ? 150 : i === 4 ? 300 : 0;
            default: 
                return 0
        }
    }

    //first animation when slider is in a viewport
    useGSAP(()=> {
        const cards = Array.from(sliderContainer.current?.children!);

        gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power4.out",
            },
            scrollTrigger: {
                // id: "product slider",
                trigger: sliderContainer.current,
                start: `top${size > 768 ? '-=250' : ''} 95%`,
                end: "bottom 20%",
                toggleActions: "play reset play reset",
                // markers: true,

                //reset the slider offset for correct animation of the first (basicSliderQuantity) slides using ScrollTrigger
                onLeave: () => {
                    setOffset(0);
                },
                onLeaveBack: () => {
                    setOffset(0);
                },
            }}
        )
        .fromTo(cards, {
            x: (i) => getResponsiveXValues(basicSliderQuantity, i),
        }, {
            x: 0,
        })
        .to(sliderContainer.current, {
            autoAlpha: 1,
        }, "-=0.5")
    }, { dependencies: [size] });

    //slider animation on offset change
    useGSAP(() => {

        const shift = (itemWidth! + gap!) * offset;
        const cards = Array.from(sliderContainer.current?.children!);

        gsap.timeline()
            .to(sliderContainer.current, {
                x: -shift,
                ease: "power4.out",
                duration: 1,
            })
            .to(cards, {
                autoAlpha: (i) => i <= offset - 1 || i > offset + basicSliderQuantity - 1 ? 0 : 1,
                ease: "power4.out",
                duration: () => size > 1024 ? 0.5 : size > 768 ? 1.5 : 2.5,
            }, '-=1');

        //scrolling slider for small screens
        gsap.matchMedia().add("(max-width: 1024px)", () => {
            let startX = 0;

            //VAR2 "spring" behavior on exceptional cases (swipes on edges); no short swipes
            /*
            Draggable.create(sliderContainer.current, {
                type: "x",
                edgeResistance: 0,
                bounds: sliderWrapper.current,
                onDragStart: function (e) {
                    startX = e.clientX || e.touches[0].clientX;
                },
                onDragEnd: function (e) {
                    const dragDistance =
                        e.clientX - startX || e.touches[0].clientX - startX;
                    if (dragDistance > 0) {
                        handleArrowClick(-basicSliderQuantity);
                    } else if (dragDistance < 0) {
                        handleArrowClick(basicSliderQuantity);
                    }
                },
            });
            */


            // VAR1 smooth slide scrolling on edges + short swipes ---------------->
            
            Draggable.create(sliderContainer.current, {
                type: "x",
                onDragStart: function (e) {
                    startX = e.clientX || e.touches[0].clientX;
                },
                onDragEnd: function (e) {
                    if (!itemWidth || !gap) return;
    
                    const dragDistance =
                        e.clientX - startX || e.touches[0].clientX - startX;

                    //case for short swipes
                    const absDist = Math.abs(dragDistance);
                    if(absDist < 50 && absDist > 0) {
                        gsap.to(sliderContainer.current, {
                            x: - offset * (itemWidth + gap),
                            ease: "power4.out",
                            duration: 1,
                        });
                    } 

                    //case of approaching the left edge
                    if (offset < basicSliderQuantity && dragDistance > 50) {
                        gsap.to(sliderContainer.current, {
                            x: 0,
                            ease: "power4.out",
                            duration: 1,
                        });
                        offset && setOffset(0);
                    }

                    //case of approaching the right edge
                    if (offset + +(dragDistance < -50) * basicSliderQuantity > data.length - basicSliderQuantity) {
                        gsap.to(sliderContainer.current, {
                            x: - (data.length - basicSliderQuantity) * (itemWidth + gap),
                            ease: "power4.out",
                            duration: 1,
                        });
                        setOffset(data.length - basicSliderQuantity);
                    } 

                    //common case
                    if (dragDistance >= 50) {
                        handleArrowClick(-basicSliderQuantity);
                    } else if (dragDistance <= -50) {
                        handleArrowClick(basicSliderQuantity);
                    }
                },
            });

        })
    }, { dependencies: [offset, size] });

    const handleArrowClick = (val: number) => {
        //VAR2 -------------------->
        /*
        if (offset + val < 0) {
            if(!offset) return;
            setOffset(0);
            return
        } else if(offset + val > data.length - basicSliderQuantity) {
            setOffset(data.length - val);
            return
        }
        setOffset(offset + val);
        */

        //VAR1 ------------------------------------------->

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