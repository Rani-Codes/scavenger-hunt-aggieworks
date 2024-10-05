const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';


export async function getItems() {
    //Grabbing token to check if user is signed in before fetching items from api
    const token = Cookies.get('token')

    //Expecting JSON data
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? {'Authorization': `Bearer ${token}`} : {})
    }

    const response = await fetch(`${API_URL}/items`, {headers})

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to fetch items');
    }

    return response.json()
}