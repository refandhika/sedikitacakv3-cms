"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  LinkIcon,
  SwatchIcon,
  HashtagIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchActiveCategories, fetchCurrentUser, createPost } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

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

export default function CreateForm() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataPost>({
    title: '',
    slug: '',
    subtitle: '',
    content: '',
    category_id: 0,
    tags: '',
    author_id: '',
    published: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parseValue: any = value;
    if (name == "title") {
      setFormData((prevData) => ({
        ...prevData,
        ["slug"]: value.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
      }));
    }
    if (name == "category_id") parseValue = parseInt(value);
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendResponse = await createPost(formData);
      router.push("/dashboard/posts");
    } catch (err) {
      console.error('Failed to submit post:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchActiveCategories();
        setCategories(fetchedData);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    }
    const fetchCurrentUserData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchCurrentUser();
        setUser(fetchedData);
        setFormData((prevData) => ({
          ...prevData,
          ["author_id"]: fetchedData.id,
        }));
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryData();
    fetchCurrentUserData();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={formData.title}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                onChange={handleChange}
                value={formData.slug}
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
                onChange={handleChange}
                value={formData.subtitle}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              <textarea
                id="content"
                name="content"
                placeholder="Enter post content"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.content}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Post Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
              defaultValue=""
            >
              {loading ? (
                <option value="" disabled>
                  Loading data ...
                </option>
              ) : (
                <>
                <option value="" disabled>
                  Select a category
                </option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
                </>
              )}
            </select>
            <SwatchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Post Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="mb-2 block text-sm font-medium">
            Tags
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="Enter post tags"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.tags}
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Post Status */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="published" className="block text-sm font-medium">
            Publish
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="published"
                name="published"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.published}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/posts"
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
