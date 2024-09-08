"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchCurrentUser, createRole } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataRole {
  name: string;
  level: string;
  can_modify_user: boolean;
  can_edit: boolean;
  can_view: boolean;
  is_guest: boolean;
}

export default function CreateForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataRole>({
    name: '',
    level: 'guest',
    can_modify_user: false,
    can_edit: false,
    can_view: false,
    is_guest: true
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendResponse = await createRole(formData);
      router.push("/dashboard/roles");
    } catch (err) {
      console.error('Failed to submit users:', err);
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
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUserData();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* Role Name */}
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
                placeholder="Enter user name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Role Level */}
        <div className="mb-4">
          <label htmlFor="level" className="mb-2 block text-sm font-medium">
            Choose level
          </label>
          <div className="relative">
            <select
              id="level"
              name="level"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
              defaultValue="guest"
            >
              <option value="" disabled>Select a role</option>
              <option key="administrator" value="administrator">Administrator</option>
              <option key="editor" value="editor">Editor</option>
              <option key="guest" value="guest">Guest</option>
            </select>
            <SwatchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Role Modify */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="modify-user" className="block text-sm font-medium">
            Can Modify User
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="modify-user"
                name="can_modify_user"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.can_modify_user}
              />
            </div>
          </div>
        </div>
        
        {/* Role Edit */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="edit" className="block text-sm font-medium">
            Can Edit
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="edit"
                name="can_edit"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.can_edit}
              />
            </div>
          </div>
        </div>
        
        {/* Role View */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="view" className="block text-sm font-medium">
            Can View
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="view"
                name="can_view"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.can_view}
              />
            </div>
          </div>
        </div>
        
        {/* Role Guest */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="guest" className="block text-sm font-medium">
            Is Guest
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="guest"
                name="is_guest"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.is_guest}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/roles"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create Role</Button>
        </div>
      </div>
    </form>
  );
}
