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

interface FormDataPost {
  title: string;
  slug: string;
  subtitle: string;
  content: string;
  category_id: number;
  tags: string;
  author_id: string;
  published: boolean;
}

interface FormDataRole {
  name: string;
  level: string;
  can_modify_user: boolean;
  can_edit: boolean;
  can_view: boolean;
  is_guest: boolean;
}

interface FormDataCategory {
  name: string;
  slug: string;
  description: string;
  published: boolean;
}

interface FormDataTech {
  title: string;
  icon: string;
}

interface FormDataProject {
  title: string;
  content: string;
  source: string | null;
  url: string | null;
  demo: string | null;
  relevant: boolean;
  published: boolean;
  tech_ids: number[];
}

interface FormDataHobby {
  title: string;
  content: string;
  image: string;
  order: number;
  active: boolean;
  published: boolean;
  item_order: number;
}

interface FormDataSetting {
  param: string;
  value: string;
  note: string;
}

/* Images */
export async function uploadImage(file:File|null) {
  const currToken = getCookie('cmsToken');
  const currUser = getCookie('currentId');

  if (!file) {
    console.error('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currToken}`
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image from API:', error);
  }
}

export async function fetchAllImages(search: string = '', page: number = 1, limit: number = 20, cat: string = '') {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/images`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch images data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching images data from API:', error);
  }
}

export async function deleteImage(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify({
        "filename": id,
        "fileloc": ""
      })
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

/* Users */
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

/* Posts */
export async function fetchAllPosts(search: string = '', page: number = 1, limit: number = 20, cat: string = '') {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/posts?page=${page}&limit=${limit}&cat=${cat}&search=${search}`, {
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

export async function fetchPostByID(id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch post ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post '+ id +' data from API:', error);
  }
}

export async function createPost(formData: FormDataPost) {
  const currToken = getCookie('cmsToken');

  const processedFormData = {
    ...formData,
    category_id: Number(formData.category_id),
    published: Boolean(formData.published)
  };
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(processedFormData),
    });

    if (!response.ok) {
      alert(`Failed to save posts data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving posts data from API: ${error}`);
    return;
  }
}

export async function updatePost(formData: FormDataPost, id: number) {
  const currToken = getCookie('cmsToken');

  const processedFormData = {
    ...formData,
    category_id: Number(formData.category_id),
    published: Boolean(formData.published)
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(processedFormData),
    });

    if (!response.ok) {
      alert(`Failed to save posts data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving posts data from API: ${error}`);
    return;
  }
}

export async function deletePost(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      alert(`Failed to delete posts data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting posts data from API: ${error}`);
    return;
  }
}

/* Post Categories */
export async function fetchActiveCategories() {
    const currToken = getCookie('cmsToken');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-categories/active`, {
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

export async function fetchAllCategories(search: string = '', page: number = 1, limit: number = 20) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-categories?page=${page}&limit=${limit}&search=${search}`, {
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

export async function fetchCategoryByID(id: number) {
  const currToken = getCookie('cmsToken');
  const currUser = getCookie('currentId');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-category/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch category ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching category '+ id +' data from API:', error);
  }
}

export async function createCategory(formData: FormDataCategory) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save category data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving category data from API: ${error}`);
    return;
  }
}

export async function updateCategory(formData: FormDataCategory, id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-category/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save post category data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving post category data from API: ${error}`);
    return;
  }
}

export async function deleteCategory(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/post-category/${id}`, {
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


/* Roles */
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
      alert(`Failed to delete role data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting role data from API: ${error}`);
    return;
  }
}

/* Techs */
export async function fetchTechByID(id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/tech/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch tech ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tech '+ id +' data from API:', error);
  }
}

export async function fetchAllTechs(search: string = '', page: number = 1, limit: number = 20) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/techs?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch techs data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching techs data from API:', error);
  }
}

export async function createTech(formData: FormDataTech) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/tech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save tech data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving tech data from API: ${error}`);
    return;
  }
}

export async function updateTech(formData: FormDataTech, id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/tech/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save tech data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving tech data from API: ${error}`);
    return;
  }
}

export async function deleteTech(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/tech/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      alert(`Failed to delete tech data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting tech data from API: ${error}`);
    return;
  }
}

/* Project */
export async function fetchProjectByID(id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/project/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch project ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project '+ id +' data from API:', error);
  }
}

export async function fetchActiveProjects(search: string = '', page: number = 1, limit: number = 20, rlv: boolean = true) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pub/projects/active?page=${page}&limit=${limit}&rlv=${rlv}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects data from API:', error);
  }
}

export async function fetchAllProjects(search: string = '', page: number = 1, limit: number = 20) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/projects?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects data from API:', error);
  }
}

export async function createProject(formData: FormDataProject) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save project data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving project data from API: ${error}`);
    return;
  }
}

export async function updateProject(formData: FormDataProject, id: number) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/project/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save project data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving project data from API: ${error}`);
    return;
  }
}

export async function deleteProject(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      alert(`Failed to delete project data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting project data from API: ${error}`);
    return;
  }
}

/* Hobby */
export async function fetchHobbyByID(id: number) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/hobby/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch hobby ${id} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hobby '+ id +' data from API:', error);
  }
}

export async function fetchAllHobbies(search: string = '', page: number = 1, limit: number = 20, cat: string = '') {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/hobbies?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch hobbies data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hobbies data from API:', error);
  }
}

export async function createHobby(formData: FormDataHobby) {
  const currToken = getCookie('cmsToken');
  console.log(formData);
  
  const processedFormData = {
    ...formData,
    order: Number(formData.order),
    item_order: Number(formData.item_order),
    active: Boolean(formData.active),
    published: Boolean(formData.published)
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/hobby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(processedFormData),
    });

    if (!response.ok) {
      alert(`Failed to save project data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving project data from API: ${error}`);
    return;
  }
}

export async function updateHobby(formData: FormDataHobby, id: number) {
  const currToken = getCookie('cmsToken');

  const processedFormData = {
    ...formData,
    order: Number(formData.order),
    item_order: Number(formData.item_order),
    active: Boolean(formData.active),
    published: Boolean(formData.published)
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/hobby/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(processedFormData),
    });

    if (!response.ok) {
      alert(`Failed to save hobby data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving hobby data from API: ${error}`);
    return;
  }
}

export async function deleteHobby(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/hobby/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      alert(`Failed to delete hobby data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting hobby data from API: ${error}`);
    return;
  }
}

/* Setting */
export async function fetchSettingByParam(param: string) {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pub/setting/${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch setting ${param} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching setting '+ param +' data from API:', error);
  }
}

export async function fetchAllSettings(search: string = '', page: number = 1, limit: number = 20, cat: string = '') {
  const currToken = getCookie('cmsToken');
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/settings?page=${page}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch settings data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching settings data from API:', error);
  }
}

export async function createSetting(formData: FormDataSetting) {
  const currToken = getCookie('cmsToken');
  console.log(formData);
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/setting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save setting data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving setting data from API: ${error}`);
    return;
  }
}

export async function updateSetting(formData: FormDataSetting, param: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/setting/${param}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      alert(`Failed to save setting data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error saving setting data from API: ${error}`);
    return;
  }
}

export async function deleteSetting(id: string) {
  const currToken = getCookie('cmsToken');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pro/setting/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currToken}`
      },
    });

    if (!response.ok) {
      alert(`Failed to delete setting data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(`Error deleting setting data from API: ${error}`);
    return;
  }
}
