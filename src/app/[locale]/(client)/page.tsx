
import Banner from "@/components/client/Banner/Banner";
import PopularCategories from "@/components/client/PopularCategories/PopularCategories";
import ProductSlider from "@/components/client/ProductSlider/ProductSlider";
import Testimonials from "@/components/client/Testimonials/Testimonials";
import FAQ from "@/components/client/FAQ/FAQ";
import { Footer } from "@/components/client/Footer/Footer";

import { bannerData } from "@/mokData/bannerData";
import { mockCategories } from "@/mokData/mockPopularCategories";
import {products} from '@/mokData/sliderProducts.js';
import { testimonialsData } from "@/mokData/testimonialsData";
import PromoBanner from "@/components/client/PromoBanner/PromoBanner";

export default async function Home() {
  return (
    <main className="main-container">
      <Banner data={bannerData} />
      <PopularCategories categories={mockCategories} />
      <ProductSlider />
      <PromoBanner promoPosition="top"/>
      <ProductSlider />
      <PromoBanner promoPosition="top"/>
      <Testimonials data={testimonialsData} />
      <FAQ />
      <Footer />
    </main>
  );
}
