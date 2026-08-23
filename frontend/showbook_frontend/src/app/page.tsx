import HeroCarousel from "../components/HeroCarousel";

const slides = [
  { id: 1, image: "/banners/banner1.png", alt: "Insidious - Out of the Further" },
  { id: 2, image: "/banners/banner2.png", alt: "CRED Cashback Offer" },
  { id: 3, image: "/banners/banner3.png", alt: "The Last of Us - HBO Series" },
  { id: 4, image: "/banners/banner4.png", alt: "coupon code" },
];

export default function Home() {
  return (
    <main className="w-full self-stretch">
      <div className="px-4 py-4">
        <HeroCarousel slides={slides} autoPlayInterval={4000} />
      </div>
    </main>
  );
}