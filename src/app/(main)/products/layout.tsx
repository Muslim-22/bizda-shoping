import Breadcrumb from '@/src/features/products/components/Breadcrumb'
import React, { ReactNode } from 'react'

export default function ProductsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto max-w-7xl px-3 pt-2">
            <Breadcrumb/>
            {children}
        </div>
    )
}
