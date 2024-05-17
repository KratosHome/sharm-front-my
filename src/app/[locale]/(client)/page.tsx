
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

const getProductForSlider = async () => {
  return new Promise<IProduct[]>(resolve => setTimeout(() => resolve(products), 1000))
}

export default async function Home() {
  const data = await getProductForSlider();
  return (
    <main className="main-container">
      <Banner data={bannerData} />
      <PopularCategories categories={mockCategories} />
      <ProductSlider />
      <Testimonials data={testimonialsData} />
      <FAQ />
      <Footer />
    </main>
  );
}
