export const getTrendingProducts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/top?page=1&limit=8&order=desc`, {
        next: { revalidate: 60 }
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

