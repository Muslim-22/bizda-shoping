export const getBrands = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`, {
        next: { revalidate: 60 }
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

