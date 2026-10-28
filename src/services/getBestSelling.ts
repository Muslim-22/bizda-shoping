export const getBestSelling = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/best-selling?page=1&limit=20&order=desc`, {
        // next: { revalidate: 6 }
        
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

