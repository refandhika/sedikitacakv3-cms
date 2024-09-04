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

interface FormDataRole {
  name: string;
  level: string;
  can_modify_user: boolean;
  can_edit: boolean;
  can_view: boolean;
  is_guest: boolean;
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
        console.error(`Failed to fetch roles data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching roles data from API:', error);
    }
}

export async function fetchAllRoles(search: string = '', page: number = 1, limit: number = 20) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/roles?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch roles data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching roles data from API:', error);
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
        console.error(`Failed to fetch current user data: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current user data from API:', error);
    }
}

export async function createRole(formData: FormDataRole) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save role data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving role data from API: ${error}`);
    return;
  }
}

export async function updateRole(formData: FormDataRole, id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/role/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save role data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving role data from API: ${error}`);
    return;
  }
}

export async function deleteRole(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/role/${id}`, {
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

export async function fetchRoleByID(id: number) {
  const currToken = getCookie('cmsToken');
  const currUser = getCookie('currentId');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/role/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch post role ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching role '+ id +' data from API:', error);
  }
}