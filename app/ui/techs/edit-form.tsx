"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchTechByID, fetchCurrentUser, updateTech } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataTech {
  title: string;
  icon: string;
}

export default function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const editId = parseInt(id);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataTech>({
    title: '',
    icon: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendResponse = await updateTech(formData, editId);
      router.push("/dashboard/techs");
    } catch (err) {
      console.error('Failed to submit techs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTechDataByID = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchTechByID(editId);
        setFormData({
          title: fetchedData.title,
          icon: fetchedData.icon
        });
      } catch (err) {
        console.error(`Failed to fetch tech ${id}:`, err);
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
    fetchTechDataByID();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">
      
        {/* Tech Title */}
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
                placeholder="Enter tech title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.title}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Tech Icon */}
        <div className="mb-4">
          <label htmlFor="icon" className="mb-2 block text-sm font-medium">
            Icon
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="icon"
                name="icon"
                type="text"
                placeholder="Enter tech icon"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.icon}
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/techs"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Update Tech</Button>
        </div>
      </div>
    </form>
  );
}
