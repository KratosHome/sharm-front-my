'use client';
import { FC, useRef } from "react";
import { gsap, Power4 } from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {children: React.ReactNode}

const ClientWrapperForButtonAnimation: FC<Props> = ({children}) => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    
    useGSAP(()=> {
        if(!triggerRef.current) return;
        const btns = gsap.utils.toArray(triggerRef.current?.querySelectorAll('.promo-banner-button'));
        
        gsap.timeline({
            scrollTrigger: {
                // id: 'promoButton',
                trigger: triggerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play reset play reset',
                // markers: true
            },
            defaults: {
                ease: Power4.easeOut,
                duration: 2,
                delay: 0.7,
                stagger: 0.5
            },
        }).fromTo(btns,
            {
                y: 100, 
                autoAlpha: 0
            }, {
                y: 0, 
                autoAlpha: 1
            }
        );
    })
    
    return (
            <div className="promo-banners-wrapper" ref={triggerRef}>
                {children}
            </div>
    )
}
export default ClientWrapperForButtonAnimation;