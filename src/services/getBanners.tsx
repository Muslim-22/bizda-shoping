export const getBanners = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
        next: { revalidate: 6 }
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

