
export const productById = async (id) =>{
    try {
        const response = await fetch(`http://localhost:3000/api/product-by-id?id=${id}`,{
            method : 'GET',
            cache : 'no-store'
        })
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}