'use client';
import { useTranslations } from "next-intl";
import { FC, useEffect, useRef, useState } from "react";
import { gsap, Power4 } from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";

import { ArrowLong } from "@/components/svg/Arrow/Arrow-long";
import {useMatchMedia} from "@/hooks/useMatchMedia";

import './BaseSlider.scss';

gsap.registerPlugin(useGSAP, Draggable);

type Props = { 
    title: string; 
    slides: {
        isMobile?: number; 
        isTablet?: number;
        isLaptop?: number;
        isDesktop: number;
    }; 
    children: React.ReactNode[];
}

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

const BaseSlider: FC<Props> = ({ title, slides, children }) => {
    const t = useTranslations('UI');

    const sliderContainer = useRef<HTMLUListElement | null>(null);
    const dots = useRef<Array<HTMLDivElement | null>>([]);
    const [offset, setOffset] = useState<number>(0);

    const resolutions = useMatchMedia();
    const {isMobile, isTablet, isLaptop, isDesktop} = resolutions;
    const currResolution = Object.keys(resolutions).find(k => resolutions[k] === true) as keyof Props["slides"];
    const slidesPerScreen = slides[currResolution] as number;

    const totalChildren = children.length;
    const screens = Math.ceil( totalChildren / slidesPerScreen );
    const dotsLength = [2,3,4,5].filter(i => !(screens % i)).sort((a, b) => b-a)[0];

    const [gap, setGap] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    
    const fullItemWidth = (itemWidth + gap);
    const basicSetOfItemsWidth = fullItemWidth && fullItemWidth * slidesPerScreen;
    
    useEffect(() => {
        const handleResize = () => {
            setGap(() => sliderContainer.current && parseFloat(window.getComputedStyle(sliderContainer.current).getPropertyValue("gap")) || 0);
            setItemWidth(() => sliderContainer.current?.children[0].getBoundingClientRect().width || 0);
            setOffset(0);
        };
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //animation when the slider appears in a viewport
    
    useGSAP(()=> {
        const cards = Array.from(sliderContainer.current?.children!);
        const mm = gsap.matchMedia();
        
        mm.add({
            isMobile: "(max-width: 767px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isLaptop: "(min-width: 1024px) and (max-width: 1199px)",
            isDesktop: "(min-width: 1200px)",
        }, (context) => {
            const {isMobile, isTablet, isLaptop, isDesktop} = context.conditions as gsap.Conditions;
            const slidesPerScreen = isDesktop ? 5 :
                isLaptop ? 4 :
                isTablet ? 3 : 2;
               
            const tl = gsap.timeline({
                defaults: {
                    duration: 2,
                    ease: Power4.easeOut,
                },
                scrollTrigger: {
                    // id: "product slider",
                    trigger: sliderContainer.current,
                    start: `top bottom`,
                    end: "bottom 10%",
                    toggleActions: "play reset play reset",
                    // markers: true,
    
                    onLeave: function() {
                        if(isLaptop || isDesktop) {
                            //reset the slider offset (screens 1024px+) for correct animation when slider returns to viewport
                            setOffset(0);
                        } else {
                            // reset the slider dots (up to 1023px screens)
                            gsap.set(dots.current, {
                                backgroundColor: '',
                                borderColor: '',
                            })
                        }
                    },
                    onLeaveBack: function() {
                        if(isLaptop || isDesktop) {
                            //reset the slider offset (screens 1024px+) for correct animation when slider returns to viewport
                            setOffset(0);
                        } else {
                            // reset the slider dots (up to 1023px screens)
                            gsap.set(dots.current, {
                                backgroundColor: '',
                                borderColor: '',
                            })
                        }
                    },
                }}
            )
            //!!!!!!!є баг  - при швидкому LeaveBack або Leave GSAP не встигає ссунути sliderContainer.current в позицію х: 0
            // подвійне застосування set(...) для скидання на початкову позицію активної dot спрацьовує, а для sliderContainer.current - ні
            //reset the slider offset (up to 1023px screens) + dots for correct animation when slider returns to viewport
                
            .set(sliderContainer.current, {x: 0})
                .set(dots.current, {
                    backgroundColor: (i) => i === 0 ? 'var(--nav-dot-active)': '',
                    borderColor: (i) => i === 0 ? 'var(--nav-dot-active)' : '',
                })
                .fromTo(cards, {
                    x: (i) => getResponsiveXValues(slidesPerScreen, i),
                }, {
                    x: 0,
                })
        });
        
    }, {scope: sliderContainer.current!});
    
    //slider animation on offset change (for screens 1024px+): using arrow buttons + offset state
    useGSAP(() => {
        gsap.matchMedia().add({
            isMobile: "(max-width: 1023px)",
            isDesktop: "(min-width: 1024px)",
        }, (context) => {
            const {isMobile, isDesktop} = context.conditions as gsap.Conditions;
            
            const shift = fullItemWidth * offset;
            const cards = Array.from(sliderContainer.current?.children!);
    
            gsap.timeline()
                .set(dots.current, {
                    backgroundColor: (i) => i === 0 ? 'var(--nav-dot-active)': '',
                    borderColor: (i) => i === 0 ? 'var(--nav-dot-active)' : '',
                })
                .to(cards, {
                    autoAlpha: (i) => i <= offset - 1 || i > offset + slidesPerScreen - 1 ? 0 : 1,
                    ease: Power4.easeOut,
                    duration: 0.8,
                })
                .to(sliderContainer.current, {
                    x: isMobile ? 0 : -shift,
                    ease: Power4.easeOut,
                    duration: 1,
                }, '<');
        })
    }, {
        dependencies: [offset, fullItemWidth, slidesPerScreen],
        scope: sliderContainer.current!
    } );

    //slider animation for small screens (up to 1023px+): for dragging elements
    useGSAP(() => {
        
        gsap.matchMedia().add("(max-width: 1023px)", () => {
            let i: number, 
                shift: number, 
                activeDot: number,
                startX: number = 0;

            // calculating the values of snaps
            const cards = Array.from(sliderContainer.current?.children!),
                snapArrLength = Math.ceil(totalChildren / slidesPerScreen),
                snapsForRightDir: number[] = [],
                snapsForLeftDir: number[] = [];
            for (i = 0; i < snapArrLength; i++) {
                const el = totalChildren - (i + 1) * slidesPerScreen > 0 ? 
                            - i * slidesPerScreen * fullItemWidth : 
                            - ( totalChildren - slidesPerScreen)* fullItemWidth;
                snapsForRightDir.push(el);
            }
            for (i = 0; i < snapArrLength; i++) {
                const el = totalChildren - (i + 1) * slidesPerScreen > 0 ? 
                            - (totalChildren - (i + 1) * slidesPerScreen) * fullItemWidth : 
                            0;
                snapsForLeftDir.unshift(el);
            }

            const getSnapForRightDir = gsap.utils.snap(snapsForRightDir);
            const getSnapForLeftDir = gsap.utils.snap(snapsForLeftDir);

            Draggable.create(sliderContainer.current, {
                type: "x",
                zIndexBoost: false,

                onDragStart: function () {
                    startX = +gsap.getProperty(this, 'x');
                },

                onDragEnd: function () {
                    this.getDirection("start") === 'left' ? 
                        (shift = getSnapForRightDir(startX - basicSetOfItemsWidth!), activeDot = snapsForRightDir.indexOf(shift)) : 
                        (shift = getSnapForLeftDir(startX + basicSetOfItemsWidth!), activeDot = snapsForLeftDir.indexOf(shift));
                    activeDot = this.getDirection("start") === 'left' ? snapsForRightDir.indexOf(shift) : snapsForLeftDir.indexOf(shift);
                    
                    gsap.timeline()
                        .to(cards, {
                            autoAlpha: 1,
                            ease: Power4.easeOut,
                            duration: 0.8,
                        })
                        .to(sliderContainer.current, {
                            x: shift,
                            ease: Power4.easeOut,
                            duration: 1,
                        }, 0)
                        .to(dots.current, {
                            ease: Power4.easeOut,
                            backgroundColor: (i) => i === activeDot ? 'var(--nav-dot-active)' : '',
                            borderColor: (i) => i === activeDot ? 'var(--nav-dot-active)' : '',
                        }, 0);
                },
            });
        })

    }, {
        dependencies: [slidesPerScreen, fullItemWidth, totalChildren],
        scope: sliderContainer.current!
    });

    const handleArrowClick = (val: number) => {
        if (offset + val < 0 || offset + val > totalChildren - slidesPerScreen) return
        setOffset(offset + val);
    }

    return (
        <section className={"product-slider"}>
            <div className="product-slider-header">
                <h3 className="product-slider-title">{t(title)}</h3>
                <div className="product-slider-navigation">
                    {(isLaptop || isDesktop) && (<>
                        <button
                            className="arrow-back-button"
                            title="arrow-control"
                            disabled={offset === 0}
                            onClick={() => handleArrowClick(-1)}>
                            <ArrowLong className="arrow-back" isMobile={false} />
                        </button>
                        <button
                            className="arrow-forward-button"
                            title="arrow-control"
                            disabled={offset === totalChildren - slidesPerScreen}
                            onClick={() => handleArrowClick(1)}>
                            <ArrowLong className="arrow-forward" isMobile={false} />
                        </button>
                    </>)}
                    <div className="slider-dots" style={{display: (isMobile || isTablet) ? '' : 'none'}}>
                        {Array(dotsLength).fill('').map((item, index) => (
                            <div key={index} ref={(el) => {dots.current[index] = el}}
                                className={`slider-dot`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="product-slider-wrapper">
                <ul className="product-slider-container" ref={sliderContainer}>
                    {children}
                </ul>
            </div>
        </section>
    )
}

export default BaseSlider;