"use client"

import Link from 'next/link';
import {
  BookOpenIcon,
  DocumentTextIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useEffect, useState } from 'react';
import { getCookie } from '@/app/lib/cookies';
import TipTap from '../tiptap';

export default function CreateForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categories, setCategories] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setSlug(updateSlug(title));
  }, [title])

  const updateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');;
  }

  const fetchPostCategories = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }

  const fetchCurrentUser = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }

  useEffect(() => {
    setCategories(fetchPostCategories());
    setUser(fetchCurrentUser());
  }, []);

  return (
    <form className="flex justify-between gap-4">
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* Post Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter post title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Post Slug */}
        <div className="mb-4">
          <label htmlFor="slug" className="mb-2 block text-sm font-medium">
            Slug
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="slug"
                name="slug"
                type="text"
                placeholder="Enter post slug"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                value={slug}
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Post Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose categories
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              {loading ? (
                <option value="" disabled>
                  Loading data ...
                </option>
              ) : (
                <option value="" disabled>
                  Select a category
                </option>
                // categories.map((category) => (
                //   <option key={category.id} value={category.id}>
                //     {category.name}
                //   </option>
                // ))
              )}
            </select>
            <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Post Subtitle */}
        <div className="mb-4">
          <label htmlFor="subtitle" className="mb-2 block text-sm font-medium">
            Subtitle
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                placeholder="Enter post subtitle"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <TipTap />
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex items-center mb-4">
          <input
            id="publish"
            name="published"
            type="checkbox"
            value="publish"
            className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
          />
          <label
            htmlFor="publish"
            className="ml-2 flex cursor-pointer items-center gap-1.5 py-1.5 text-md font-medium"
          >
            Published
          </label>
        </div>
        <div className="flex gap-4">
          <Link
            href="/dashboard/post"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create Post</Button>
        </div>
      </div>
    </form>
  );
}
