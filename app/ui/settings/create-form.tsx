"use client"

import Link from 'next/link';
import {
  CogIcon,
  PuzzlePieceIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchCurrentUser, createSetting } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataSetting {
  param: string;
  value: string;
  note: string;
}

export default function CreateForm() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataSetting>({
    param: '',
    value: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
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
      const sendResponse = await createSetting(formData);
      router.push("/dashboard/settings");
    } catch (err) {
      console.error('Failed to submit setting:', err);
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

        {/* Setting Param */}
        <div className="mb-4">
          <label htmlFor="param" className="mb-2 block text-sm font-medium">
            Parameter
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="param"
                name="param"
                type="text"
                placeholder="Enter setting parameter"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.param}
              />
              <CogIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Setting Value */}
        <div className="mb-4">
          <label htmlFor="value" className="mb-2 block text-sm font-medium">
            Value
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="value"
                name="value"
                type="text"
                placeholder="Enter setting value"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.value}
              />
              <PuzzlePieceIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Setting Note */}
        <div className="mb-4">
          <label htmlFor="note" className="mb-2 block text-sm font-medium">
            Note
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="note"
                name="note"
                placeholder="Enter setting note"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.note}
              ></textarea>
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/settings"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create Setting</Button>
        </div>
      </div>
    </form>
  );
}
