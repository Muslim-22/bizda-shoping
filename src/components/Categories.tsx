import Link from "next/link";
import { allCategoryes } from "../services/categoryes";
import { Category } from "../features/categories/types/categoryes";

export default async function CategoryDetail() {
const categoryes = await allCategoryes()
  return (
    <div className='max-w-310 w-full m-[0px_auto] h-12.75 flex items-center justify-between p-2.5 gap-5'>
      {
        categoryes?.map((item: Category) => (
          <Link key={item.id} href={`/products/${item.slug}`} className=' font-["Lato"] font-normal text-[16px] leading-none tracking-normal cursor-pointer hover:text-[#4EA674]'>
            <p className=' font-["Lato"] font-normal text-[16px] leading-none tracking-normal cursor-pointer hover:text-[#4EA674]'>{item.name}</p>
          </Link>
        ))
      }
      {/* <p className='font-["Lato"] font-normal text-[16px] leading-none tracking-normal cursor-pointer hover:text-[#4EA674]'>see more</p> */}
    </div>
  )
}
