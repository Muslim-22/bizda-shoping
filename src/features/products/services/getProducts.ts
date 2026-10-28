import { Product } from "../types/products";

export const getAllProducts = async () => {
    const response = await fetch(`https://oline-shop-backend.onrender.com/api/products`, {
        next: { revalidate: 60 },
    })
    if (!response.ok) {
        throw new Error("Mahsulotlarni yuklashda xatolik yuz berdi");
    }

    const result = await response.json();

    console.log(result)
    // API array yoki { success: true, data: [...] } qaytarishi mumkin.
    const products = Array.isArray(result)
        ? result
        : result.data;

    if (!Array.isArray(products)) {
        throw new Error("API mahsulotlar ro'yxatini qaytarmadi");
    }

    return products.filter(
        (product: Product): boolean => product.isActive !== false
    );
}

export const getProduct = async (params: string) => {
    const response = await fetch(`https://oline-shop-backend.onrender.com/api/products/${params}`, {
        next: { revalidate: 60 }
    })
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("Mahsulotni yuklab bo'lmadi");

    const result = await response.json();
    return result.data ?? result;
}