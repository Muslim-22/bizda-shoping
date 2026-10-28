
import Image from "next/image";
import Link from "next/link";
import type { ProductType } from "../features/categories/types/products";

type ProductCardProps = {
  product: ProductType;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage =
    product.images?.find((image) => image.isMain) ??
    product.images?.[0];

  const productHref = `/products/${product.category?.slug ?? ""}/${product.id}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-sm hover:shadow-gray-200/60">
      {/* Image */}
      <Link href={productHref} className="relative block overflow-hidden">
        <div className="flex aspect-square items-center justify-center p-4">
          {mainImage?.url ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || product.name}
              width={400}
              height={400}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              Rasm mavjud emas
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.discountPercent > 0 && (
            <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{product.discountPercent}%
            </span>
          )}

          {product.isNew && (
            <span className="rounded-lg bg-[#4caf7d] px-2 py-1 text-xs font-semibold text-white">
              Yangi
            </span>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="p-3 sm:p-4">
        <p className="mb-1 text-xs font-medium text-gray-400">
          {product.brand?.name || "Brendsiz"}
          {" · "}
          {product.category?.name || "Boshqa"}
        </p>

        <Link href={productHref}>
          <h2 className="min-h-10 line-clamp-2 text-sm font-semibold leading-5 text-gray-800 transition hover:text-[#399765] sm:text-base">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1 text-sm">
          <span className="text-amber-400">★</span>

          <span className="font-medium text-gray-700">
            {Number(product.averageRating || 0).toFixed(1)}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviewsCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3">
          <p className="text-base font-bold text-gray-900 sm:text-lg">
            {formatPrice(product.price)}
          </p>

          {product.oldPrice != null &&
            product.oldPrice > product.price && (
              <p className="mt-1 text-xs text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
        </div>

        {/* Details */}
        <Link
          href={productHref}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#edf8ee] px-3 py-3 text-sm font-semibold text-[#399765] transition hover:bg-[#4caf7d] hover:text-white"
        >
         Mahsulotni ko&apos;rish
        </Link>
      </div>
    </article>
  );
}
