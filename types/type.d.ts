//Product card
interface IProduct {
    id:string;
    isLux: boolean;
    img: string;
    url: string;
    rating: number;
    votes: number;
    items: IProductVariant[];
    translations: IProductTranslations[];
}

interface IProductVariant {
    name: string;
    sku: string;
    price: string;
    oldPrice: string;
    stock: number;
    count: string;
    color: string;
    img: string;
}
  
interface IProductTranslations {
    lang: string;
    title: string;
    subTitle: string;
    description: string;
    shortDescription: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
}