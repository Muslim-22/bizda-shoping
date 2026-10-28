import ProductCard from '@/src/components/Card'
import { getTrendingProducts } from '@/src/services/getTrendingProduct'
import React from 'react'
import { ProductType } from '../../categories/types/products'

export default async function TrendingProducts() {
    const data = await getTrendingProducts()
    return (
        <div className='max-w-310 w-full m-[0px_auto] flex flex-col justify-center gap-8 p-[0px_0px_100px]'>
            <div className='flex items-center justify-between'>
                <p className='font-bold text-[32px]'>Top Products</p>
                <button className='border border-black rounded-[200px] p-[12px_24px] cursor-pointer'>
                    View All
                </button>
            </div>
            <div className='grid  grid-cols-4 gap-8'>
                {
                    data?.map((item:ProductType)=><ProductCard key={item?.id} product={item}/>)
                }
            </div>
        </div>
    )
}
