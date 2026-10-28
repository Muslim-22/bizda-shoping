import { getBrands } from '@/src/services/getBrands'
import React from 'react'
import BrandsList from './BrandsList'

export default async function StartExpolingNow() {
    const data = await getBrands()
    return (
        <div className='max-w-310 w-full mx-auto flex flex-col justify-center gap-8 pb-25'>
            {/* Sarlavha va View All tugmasi */}
            <div className='flex items-center justify-between '>
                <p className='font-bold text-[32px]'>All Brands</p>
                <button className='border border-black rounded-[200px] px-6 py-3 cursor-pointer hover:bg-black hover:text-white transition-all duration-300'>
                    View All
                </button>
            </div>
             <div>
                <BrandsList brands={data}/>
             </div>
        </div>
    )
}
