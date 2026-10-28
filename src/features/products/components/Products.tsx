
import ProductCard from "@/src/components/Card";
import type { Product } from "../types/products";
import Filter from "./Filter";
import { allCategoryes } from "@/src/services/categoryes";
import { getBrands } from "@/src/services/getBrands";

type FilterItem = {
  name: string;
  slug: string;
};

type ProductsProps = {
  data: Product[];
  slug: string;
};

export default async function Products({
  data,
  slug,
}: ProductsProps) {
  const categories: FilterItem[] = await allCategoryes();
  const brands: FilterItem[] = await getBrands();

  return (
    <section className="my-2 flex items-start gap-4">
      <Filter
        categories={categories.map((item) => ({
          label: item.name,
          value: item.slug,
        }))}
        brands={brands.map((item) => ({
          label: item.name,
          value: item.slug,
        }))}
      />

      <div className="w-full">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold uppercase">
            {slug || "Mahsulotlar"}
          </h3>

          <p className="text-sm text-gray-500">
            {data.length} ta mahsulot sotuvda bor
          </p>
        </div>

        <div className="mt-4 grid grid-cols-4 items-start gap-4">
          {data.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
