import { getCookie } from "./cookies";

interface FormDataUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    birth: string;
    linkedin: string;
    github: string;
    role_id: number;
}

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

export async function fetchUserByID(id: string) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pub/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch user ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id} data from API:`, error);
  }
}

export async function createUser(formData: FormDataUser) {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert(`Failed to save users data: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert(`Error saving users data from API: ${error}`);
      return;
    }
}

export async function updateUser(formData: FormDataUser, id: string) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/user/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save users data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving users data from API: ${error}`);
    return;
  }
}

export async function deleteUser(id: string) {
    const currToken = getCookie('cmsToken');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currToken}`
        },
      });

      if (!response.ok) {
        alert(`Failed to delete users data: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert(`Error deleting users data from API: ${error}`);
      return;
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

export async function fetchRoles() {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/roles`, {
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