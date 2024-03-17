import CartSvg from "@/components/svg/CartSvg";
import HeartSvg from "@/components/svg/HeartSvg";
import PhoneSvg from "@/components/svg/PhoneSvg";
import SearchSvg from "@/components/svg/SearchSvg";
import SinkingShipSvg from "@/components/svg/SinkingShipSvg";
import UserSvg from "@/components/svg/UserSvg";

export const navLink = [
  {
    title: "Люкс",
    path: "#",
    child: [
      { title: "Шампунь", path: "?pad=dwd", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
    isLuxe: true,
  },
  {
    title: "Бренди",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Парфумерія",
    path: "#",
    child: [
      { title: "Спрей для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Макіяж",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за обличчям",
    path: "#",
    child: [
      { title: "Спрей для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за тілом",
    path: "#",
    child: [
      { title: "Бальзам для волосся", path: "#", child: [] },
      { title: "Шампунь", path: "#", child: [] },
      { title: "Мус для стайлінгу", path: "#", child: [] },
    ],
  },
  {
    title: "Догляд за волоссям",
    path: "#",
    child: [
      { title: "Шампунь", path: "#", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
  },
  {
    title: "Товари для дому",
    path: "#",
    child: [
      { title: "Шампунь", path: "#", child: [] },
      { title: "Бальзам для волосся", path: "#", child: [] },
    ],
  },
];

export const topBarLinks = [
  {
    title: "Акційні пропозиції",
    path: "#",
    isPromotional: true,
  },
  {
    title: "Доставка і Оплата",
    path: "#",
  },
  {
    title: "Статті",
    path: "#",
  },
  {
    title: "Наша команда",
    path: "#",
  },
  {
    title: "Про магазин",
    path: "#",
  },
];

export const userNavOpen = [
  {
    title: "Моя корзина",
    icon: <CartSvg />,
    path: "#",
  },
  {
    title: "Мій акаунт",
    icon: <UserSvg />,
    path: "#",
  },
  {
    title: "Мій список бажань",
    icon: <HeartSvg />,
    path: "#",
  },
  {
    title: "[0800 50 51 13]",
    icon: <PhoneSvg />,
    path: "tel:0800505113",
  },
];

export const userNav = [
  {
    title: "Пошук",
    icon: <SearchSvg />,
    path: "#",
  },
  {
    title: "Мій список бажань",
    icon: <HeartSvg />,
    path: "#",
  },
  {
    title: "Мій акаунт",
    icon: <UserSvg />,
    path: "#",
  },
  {
    title: "Моя корзина",
    icon: <CartSvg />,
    path: "#",
  },
];

export const localizationList = [
  {
    title: "UA",
    name: "uk",
  },
  {
    title: "EN",
    name: "en",
  },
  {
    title: "RU",
    name: "ru",
    icon: <SinkingShipSvg />,
  },
];

export const extraMenuLink = [
  { title: "Акційні пропозиції", path: "#", isPromotional: true },
  { title: "Нові надходження", path: "#" },
];
