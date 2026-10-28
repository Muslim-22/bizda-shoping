
export const getProduct = async (params: string|null|undefined) => {
    const response = await fetch(`https://oline-shop-backend.onrender.com/api/products${params?"?"+params:""}`, {
        // next: { revalidate: 60 }
    })
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("Mahsulotni yuklab bo'lmadi");

    const result = await response.json();
    return result.data ?? result;
}