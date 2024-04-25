"use client";
import { useEffect, useRef } from "react";
import "./FAQ.scss";
import { gsap } from "gsap";
import { faqSectionData } from "@/mokData/faqSection";
import { useGSAP } from "@gsap/react";
import Accordion from "@/components/UI/Accordion/Accordion";

const Faq = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
     const getMaxHeight = () => { 
      const p = gsap.utils.toArray('.container-accordion > h6 > span');
      const hArr = p.map((item) => (item as HTMLElement).getBoundingClientRect().height);
      return Math.max(...hArr)
    };
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      
      gsap.set('.container-accordion>h6>span', {height: () => getMaxHeight() });
      
      gsap.timeline({
        scrollTrigger: {
          // id: "FAQ",
          trigger: sectionRef.current,
          start: "top-=100 80%",
          end: "bottom-=200 25%",
          toggleActions: "play reset play reset",
          // markers: true,
        }}
      )
      .to(sectionRef.current, {
        autoAlpha: 1,
        ease: "power2.out",
        duration: 2
      })
      .to('.container-accordion', {
        x: 0,
        stagger: 0.2,
        ease: "circ.out",
      }, "-=2");

    });
      
   
  }, {scope: sectionRef});

  return (
    <section className="container-main-faq" ref={sectionRef}>
      <h5 className="title-main-faq">Інтернет магазин косметики та парфумерії Sharm Beauty</h5>
      <ul className="wrapper-list-faq">
        <li>
          <Accordion
            title={faqSectionData[0].question}
            style={{ transform: "translate(-1000px, 0px)" }}>
            {faqSectionData[0].answer}
          </Accordion>
          <Accordion
            title={faqSectionData[1].question}
            style={{ transform: "translate(-1000px, 0px)" }}>
            {faqSectionData[1].answer}
          </Accordion>
        </li>
        <li>
          <Accordion
            title={faqSectionData[2].question}
            style={{ transform: "translate(1000px, 0px)" }}>
            {faqSectionData[2].answer}
          </Accordion>
          <Accordion
            title={faqSectionData[3].question}
            style={{ transform: "translate(1000px, 0px)" }}>
            {faqSectionData[3].answer}
          </Accordion>
        </li>
      </ul>
    </section>
  );
};

export default Faq;
