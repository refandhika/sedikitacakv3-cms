"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchHobbyByID, fetchCurrentUser, updateHobby } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataHobby {
  title: string;
  content: string;
  image: string;
  order: number;
  active: boolean;
  published: boolean;
  item_order: number;
}

export default function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const editId = parseInt(id);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataHobby>({
    title: '',
    content: '',
    image: '',
    order: 0,
    active: false,
    published: false,
    item_order: 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let parseValue: any = value;
    if (name == "order") {
      parseValue = parseInt(value);
      setFormData((prevData) => ({
        ...prevData,
        ["item_order"]: parseValue,
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
      const sendResponse = await updateHobby(formData, editId);
      router.push("/dashboard/hobbies");
    } catch (err) {
      console.error('Failed to submit hobbies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHobbyDataByID = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchHobbyByID(editId);
        console.log(fetchedData);

        setFormData({
          title: fetchedData.title,
          content: fetchedData.content,
          image: fetchedData.image,
          order: fetchedData.order,
          active: fetchedData.active,
          published: fetchedData.published,
          item_order: fetchedData.item_order
        });
      } catch (err) {
        console.error(`Failed to fetch hobby ${id}:`, err);
      } finally {
        setLoading(false);
      }
    }
    const fetchCurrentUserData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchCurrentUser();
        setUser(fetchedData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUserData();
    fetchHobbyDataByID();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* Hobby Title */}
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
                placeholder="Enter hobby title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.title}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Hobby Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Enter hobby content"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.content}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Hobby Image */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image"
                name="image"
                type="text"
                placeholder="Enter hobby image"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.image}
              />
              <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Hobby Order */}
        <div className="mb-4">
          <label htmlFor="order" className="mb-2 block text-sm font-medium">
            Item Order
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="order"
                name="order"
                type="number"
                placeholder="Enter project order"
                className="peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.order}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Hobby State */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="active" className="block text-sm font-medium">
            Active
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="active"
                name="active"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.active}
              />
            </div>
          </div>
        </div>

        {/* Hobby Status */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="published" className="block text-sm font-medium">
            Published
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
            href="/dashboard/hobbies"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Update Hobby</Button>
        </div>
      </div>
    </form>
  );
}
