import ProductCard from "@/src/components/Card";
import { Product } from "../types/products";
import Filter from "./Filter";
import { allCategoryes } from "@/src/services/categoryes";
import { getBrands } from "@/src/services/getBrands";


export default async function Products({ data, slug }: { data: [], slug: string }) {
  const categories = await allCategoryes()
  const brands = await getBrands()
  return (
    <section className="flex my-2 gap-4 items-start">
      <Filter categories={categories.map(item => {
        return { label: item.name, value: item?.slug }
      })} brands={brands.map(item => {
        return { label: item.name, value: item?.slug }
      })} />
      <div className="w-full">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold uppercase">{slug ? slug : "Mahsulotlar"}</h3>
          <p className="text-sm text-gray-500">{data?.length} ta mahsulot sotuvda bor</p>
        </div>
        <div className="grid grid-cols-4 gap-4 items-start mt-4">
          {
            data?.map((item: Product) => <ProductCard key={item?.id} product={item} />)
          }
        </div>
      </div>
    </section>
  )
}
