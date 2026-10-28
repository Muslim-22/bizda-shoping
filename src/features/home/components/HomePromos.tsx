
import { getHomePromos } from "@/src/services/getHomePromos";
import Link from "next/link";

type PromoProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  discountAmount: number;
  inStock: boolean;
  image: string | null;
};

type HomePromo = {
  id: string;
  type: "PROMO" | "CATEGORY" | "BANNER" | "DEAL";
  title: string;
  subtitle: string | null;
  image: string | null;
  position?: string;
  buttonText: string;
  link: string;
  badgeText: string | null;
  sortOrder: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  products?: PromoProduct[];
  product?: PromoProduct;
};

const formatPrice = (price: number) =>
  `${price.toLocaleString("en-US")} UZS`;

export default async function HomePromos() {
  const response = await getHomePromos();

  const data: HomePromo[] = Array.isArray(response)
    ? response
    : response?.data ?? [];

  const sortedData = [...data].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const promo = sortedData.find((item) => item.type === "PROMO");
  const category = sortedData.find(
    (item) => item.type === "CATEGORY"
  );
  const banners = sortedData.filter(
    (item) => item.type === "BANNER"
  );
  const deal = sortedData.find((item) => item.type === "DEAL");

  return (
    <section className="relative z-10 mx-auto -mt-16 w-full max-w-[1240px] px-4">
      <section className="w-full py-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative h-[130px] overflow-hidden rounded-xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: banner.image
                    ? `url("${banner.image}")`
                    : "none",
                  backgroundPosition: banner.position ?? "center",
                }}
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h3 className="text-xl font-bold tracking-wide">
                  {banner.title}
                </h3>

                {banner.subtitle && (
                  <p className="mb-3 text-sm">
                    {banner.subtitle}
                  </p>
                )}

                <Link
                  href={banner.link || "/products"}
                  className="rounded-full border border-white/70 bg-black/40 px-6 py-1.5 text-xs text-white transition hover:bg-white hover:text-black"
                >
                  {banner.buttonText || "Shop Now"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
