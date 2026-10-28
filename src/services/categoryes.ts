export const allCategoryes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 60*60 }
    }).then(res => res.json())
        .then(data => data.data)
    return response

}

