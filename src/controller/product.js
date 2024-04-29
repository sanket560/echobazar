
const FRONTEND_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const productById = async (id) =>{
    try {
        const response = await fetch(`${FRONTEND_BASE_URL}api/product-by-id?id=${id}`,{
            method : 'GET',
            cache : 'no-store'
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}