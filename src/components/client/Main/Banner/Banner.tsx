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
import Image from "next/image";
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
      bounds: ".container-banner-gallery",
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
    gsap.to(".container-banner-cover .container-banner-left", {
      y: "-100%",
      ease: Power3.easeOut,
      duration: 1,
      delay: 0.5,
    });

    gsap.to(".container-banner-cover .container-banner-right", {
      x: "100%",
      ease: Power3.easeOut,
      duration: 1,
      delay: 0.7,
    });

    gsap.from(".container-banner-image", {
      scale: 1,
      ease: Power3.easeOut,
      duration: 1,
      delay: 1,
    });

    gsap.to(".container-banner-cover", {
      css: {
        display: "none",
      },
      duration: 0,
      delay: 2.2,
    });

    gsap.fromTo(
      ".container-banner-overlay",
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
      <div className="container-banner-gallery">
        <div className="container-banner-image">
          <ul ref={imageList}>
            {data.map((item, idx) => (
              <li className={offset === idx ? "active" : ""} key={idx}>
                <button
                  className="container-banner-controls-prev"
                  type="button"
                  name="arrow-control"
                  title="arrow-control"
                  onClick={() => handleArrowClick("prev")}>
                  <Arrow className="container-banner-controls-prevArrow" />
                </button>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1300}
                  height={560}
                />
                <div className="container-banner-overlay">
                  <div className="container-banner-phrase-block">
                    <span className="container-banner-phrase">
                      {item.phrase}
                    </span>
                    <span className="container-banner-additionalPhrase">
                      {item.additionalPhrase}
                    </span>
                  </div>
                  <div className="container-banner-button">
                    <MyBtn
                      text="ПЕРЕГЛЯНУТИ"
                      color="primary"
                      click={() => router.push(`/${item.infoPath}`)}
                    />
                  </div>
                </div>
                <button
                  className="container-banner-controls-next"
                  type="button"
                  name="arrow-control"
                  title="arrow-control"
                  onClick={() => handleArrowClick("next")}>
                  <Arrow className="container-banner-controls-nextArrow" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-banner-cover">
          <div className="container-banner-left"></div>
          <div className="container-banner-right"></div>
        </div>
        <div className="container-banner-dots" ref={dotsContainer}>
          {data.map((_, index) => (
            <div
              key={index}
              className={`container-banner-dot ${
                index === offset ? "active" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
