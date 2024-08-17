import { getCookie } from "./cookies";

export async function fetchUsers(search: string = '', page: number = 1, limit: number = 20) {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/users?page=${page}&limit=${limit}&search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch users data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users data from API:', error);
    }
}

export async function fetchPosts(search: string = '', page: number = 1, limit: number = 20, cat: string = '') {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pub/posts?page=${page}&limit=${limit}&cat=${cat}&search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch posts data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts data from API:', error);
    }
  }

export async function fetchPostCategories() {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch post categories data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post categories data from API:', error);
    }
}

export async function fetchCurrentUser() {
    const currToken = getCookie('cmsToken');
    const currUser = getCookie('currentId');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pub/user/${currUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch post categories data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post categories data from API:', error);
    }
}