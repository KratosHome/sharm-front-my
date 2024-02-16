

"use client";
import React, { FC, useEffect, useRef, useState } from 'react';
import { gsap, Power3 } from "gsap";
import { useGSAP } from "@gsap/react";
import "./banner.scss"
import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

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
  
    const [offset, setOffset] = useState<number>(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

 
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
  
      const autoPlay = () => {
        if (autoPlayEnabled) {
          setOffset((prevOffset) => (prevOffset + 1) % data.length);
        }
      };
  
      timeoutId = setTimeout(autoPlay, 2500);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [offset, data.length, autoPlayEnabled]);
  
    const handleMouseEnter = () => {
      setAutoPlayEnabled(false);
    };
  
    const handleMouseLeave = () => {
      setAutoPlayEnabled(true);
    };
  
    useEffect(() => {
      const shift = imageList.current?.getBoundingClientRect().width || 0;
  
      Array.from(imageList.current?.children || []).forEach((image, index) => {
        gsap.to(image as HTMLElement, {
          x: -(shift * offset),
          ease: Power3.easeOut,
          duration: 1,
        });
      });
    }, [offset]);
  
 
  
    const handleArrowClick = (direction: 'next' | 'prev') => {
      setAutoPlayEnabled(false);
      setOffset((prevOffset) => {
        return (prevOffset + (direction === 'next' ? 1 : -1) + data.length) % data.length;
      });
    };
  
    const handleDotClick = (index: number) => {
      setAutoPlayEnabled(false);
      setOffset(index);
    };
  
    const goToPage = () => {
      console.log("GO TO PAGE FROM BANNER");
    };
    useEffect(() => {
      let startX = 0;
      const draggableInstance = Draggable.create(imageList.current, {
        type: 'x',
        bounds: '.gallery',
        edgeResistance: 0.65,
        throwProps: true,
        onDragStart: function (e) {
          startX = e.clientX || e.touches[0].clientX; 
          console.log('Dragging started');
        },
        onDragEnd: function (e) {
          const dragDistance = e.clientX - startX || e.touches[0].clientX - startX;
          if (dragDistance > 50) {
            handleArrowClick('prev');
          } else if (dragDistance < -50) {
            handleArrowClick('next');
          }
        },
      });
    
      return () => {
        draggableInstance[0].kill();
      };
    }, []);
    


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


}, [offset])
  
 
      return (
      <div className="wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="gallery">
        <div className="image">
          <ul ref={imageList}>
            {data.map((item, idx) => (
              <li className={offset === idx ? 'active' : ''} key={idx}>
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
            <button onClick={() => handleArrowClick('prev')} disabled={offset === 0}>
            <img src="left-arrow.svg" alt="Left" />
          </button>
          <button onClick={() => handleArrowClick('next')} disabled={offset === data.length - 1}>
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
            className={`dot ${index === offset ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      </div>
      </div>
    );
  };      
 
  export default Banner;

