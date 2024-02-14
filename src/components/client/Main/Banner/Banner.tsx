

"use client";
import React, { FC, useEffect, useRef, useState } from 'react';
import { gsap, Power3 } from "gsap";
import { useGSAP } from "@gsap/react";
import "./banner.scss"

type BannerItem = {
    id: number;
    title: string;
    phrase: string;
    additionalPhrase: string;
    description: string;
    image: string;
    infoPath: string;
  };
  
  type BannerData = BannerItem[];
  
  interface BannerProps {
    data: BannerData;
  }
const Banner: FC<BannerProps> = ({ data }) => {
    let imageList = useRef<HTMLUListElement | null>(null);
    let dotsContainer = useRef<HTMLDivElement | null>(null);
  
    const [active, setActive] = useState<number>(0);
    
  
    useEffect(() => {

      gsap.to('.cover .left', {
        y: '-100%',
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.5,
      });
  
      gsap.to('.cover .right', {
        x: '100%',
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.7
      });
  
      gsap.from('.image', {
        scale: 1,
        ease: Power3.easeOut,
        duration: 1,
        delay: 1,
      });
  
      gsap.to('.cover', {
        css: {
          display: 'none',
        },
        duration: 0,
        delay: 2.2,
      });

      gsap.fromTo('.overlay', {
        y: '-100%',
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.3,
      }, {
        y: "0",
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.3,
      });


}, [active])
  
 
        useEffect(() => {
          const shift = imageList.current?.getBoundingClientRect().width || 0;
          
          Array.from(imageList.current?.children || []).forEach((image, index) => {
            gsap.to(image as HTMLElement, {
              x: -(shift * active),
              ease: Power3.easeOut,
              duration: 1,
            });
          });
        }, [active]);
    const goToPage = () =>{
    console.log("GO TO PAGE FROM BANNER");
    }
    const updateActive = (newActive: number) => {
      const clampedActive = Math.max(0, Math.min(newActive, data.length - 1));
      setActive(clampedActive);
    };
  
    const handleDotClick = (index: number) => {
      updateActive(index);
    };
  
    const handleArrowClick = (direction: 'next' | 'prev') => {
      const newActive = direction === 'next' ? active + 1 : active - 1;
      updateActive(newActive);
    };    return (
      <div className="wrapper">
      <div className="gallery">
        <div className="image">
          <ul ref={imageList}>
            {data.map((item, idx) => (
              <li className={active === idx ? 'active' : ''} key={idx}>
                <img src={item.image} alt={item.title} />
                <div className="overlay">
                <span className="phrase">{item.phrase}</span>
                <span className="additionalPhrase">{item.additionalPhrase}</span>
                <button className="buttonGoToPage" onClick={goToPage} type="button" title='goTo'>
                  ПЕРЕГЛЯНУТИ
                </button>
              </div>
              </li>
            ))}
          </ul>
          <div className="controls">
            <button onClick={() => handleArrowClick('prev')} disabled={active === 0}>
            <img src="left-arrow.svg" alt="Left" />
          </button>
          <button onClick={() => handleArrowClick('next')} disabled={active === data.length - 1}>
            <img src="right-arrow.svg" alt="Right" />
          </button>
          </div>
        </div>
        <div className="cover">
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="dots" ref={dotsContainer}>
        {data.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === active ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      </div>
      </div>
    );
  };      
 
  export default Banner;

