import { getCookie } from "./cookies";


export async function fetchPostCategories() {
    // setLoading(true);
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
      //console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching post categories data from API:', error);
    } finally {
    //   setLoading(false);
    }
}

export async function fetchCurrentUser() {
    //setLoading(true);
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
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching post categories data from API:', error);
    } finally {
      //setLoading(false);
    }
}