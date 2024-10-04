const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';


export async function login(username: string, password: string) {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
    
      const data = await response.json();
      Cookies.set('token', data.access_token, { path: '/' });
      return data;
    }
  
export async function signup(username:string, password: string) {
    const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Something went wrong');
      }
    
      const data = await response.json();
      Cookies.set('token', data.access_token, { path: '/' });
      return data;
}

export async function deleteUser(id: any) {
  const token = Cookies.get('token'); 
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  })

  if(!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || "Something went wrong")
  }

  return await response.json
}