"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchCurrentUser, createCategory } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataCategory {
  name: string;
  slug: string;
  description: string;
  published: boolean;
}

export default function CreateForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataCategory>({
    name: '',
    slug: '',
    description: '',
    published: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name == "name") {
      setFormData((prevData) => ({
        ...prevData,
        ["slug"]: value.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
      }));
    }
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
      const sendResponse = await createCategory(formData);
      router.push("/dashboard/categories");
    } catch (err) {
      console.error('Failed to submit category:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchCurrentUser();
        setUser(fetchedData);
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUserData();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter category name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.name}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Category Slug */}
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
                placeholder="Enter category slug"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.slug}
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Category Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Enter category description"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Category Active */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="published" className="block text-sm font-medium">
            Activated
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
            href="/dashboard/categories"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create Category</Button>
        </div>
      </div>
    </form>
  );
}
