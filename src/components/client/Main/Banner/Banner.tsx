"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { gsap, Power3 } from "gsap";
import { useGSAP } from "@gsap/react";
import "./banner.scss";
import Draggable from "gsap/Draggable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import { BannerItem } from "@/mokData/bannerData";
import { Arrow } from "@/components/general/svg/Arrow";
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
gsap.registerPlugin(Draggable);

type BannerData = BannerItem[];

interface BannerProps {
  data: BannerData;
}

const Banner: FC<BannerProps> = ({ data }) => {
  const router = useRouter();
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

  useGSAP(() => {
    const shift = imageList.current?.getBoundingClientRect().width || 0;

    Array.from(imageList.current?.children || []).forEach((image, _) => {
      gsap.to(image as HTMLElement, {
        x: -(shift * offset),
        ease: Power3.easeOut,
        duration: 1,
      });
    });
  }, [offset]);

  const handleArrowClick = (direction: "next" | "prev") => {
    setAutoPlayEnabled(false);
    setOffset((prevOffset) => {
      return (
        (prevOffset + (direction === "next" ? 1 : -1) + data.length) %
        data.length
      );
    });
  };

  const handleDotClick = (index: number) => {
    setAutoPlayEnabled(false);
    setOffset(index);
  };

  useGSAP(() => {
    let startX = 0;
    const draggableInstance = Draggable.create(imageList.current, {
      type: "x",
      bounds: ".banner-gallery",
      edgeResistance: 0.65,
      throwProps: true,
      onDragStart: function (e) {
        startX = e.clientX || e.touches[0].clientX;
      },
      onDragEnd: function (e) {
        const dragDistance =
          e.clientX - startX || e.touches[0].clientX - startX;
        if (dragDistance > 50) {
          handleArrowClick("prev");
        } else if (dragDistance < -50) {
          handleArrowClick("next");
        }
      },
    });

    return () => {
      draggableInstance[0].kill();
    };
  }, []);

  useEffect(() => {
    gsap.to(".banner-cover .banner-left", {
      y: "-100%",
      ease: Power3.easeOut,
      duration: 1,
      delay: 0.5,
    });

    gsap.to(".banner-cover .banner-right", {
      x: "100%",
      ease: Power3.easeOut,
      duration: 1,
      delay: 0.7,
    });

    gsap.from(".banner-image", {
      scale: 1,
      ease: Power3.easeOut,
      duration: 1,
      delay: 1,
    });

    gsap.to(".banner-cover", {
      css: {
        display: "none",
      },
      duration: 0,
      delay: 2.2,
    });

    gsap.fromTo(
      ".banner-overlay",
      {
        y: "-100%",
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.3,
      },
      {
        y: "0",
        ease: Power3.easeOut,
        duration: 1,
        delay: 0.3,
      }
    );
  }, [offset]);

  return (
    <div
      className="container-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="banner-gallery">
        <div className="banner-image">
          <ul ref={imageList}>
            {data.map((item, idx) => (
              <li className={offset === idx ? "active" : ""} key={idx}>
                <img
                  className="banner-slide"
                  src={item.image}
                  alt={item.title}
                />
                <div className=" banner-overlay">
                  <div className="banner-phrase-block">
                    <span className="banner-phrase">{item.phrase}</span>
                    <span className="banner-additionalPhrase">
                      {item.additionalPhrase}
                    </span>
                  </div>
                  <div className="banner-button">
                    <MyBtn
                      width="330"
                      text="ПЕРЕГЛЯНУТИ"
                      color="primary"
                      click={() => router.push(`/${item.infoPath}`)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="banner-controls-prev"
            type="button"
            name="arrow-control"
            title="arrow-control"
            onClick={() => handleArrowClick("prev")}>
            <Arrow className="banner-controls-prevArrow" />
          </button>
          <button
            className="banner-controls-next"
            type="button"
            name="arrow-control"
            title="arrow-control"
            onClick={() => handleArrowClick("next")}>
            <Arrow className="banner-controls-nextArrow" />
          </button>
        </div>
        <div className="banner-cover">
          <div className="banner-left"></div>
          <div className="banner-right"></div>
        </div>
        <div className="banner-dots" ref={dotsContainer}>
          {data.map((_, index) => (
            <div
              key={index}
              className={`banner-dot ${index === offset ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
