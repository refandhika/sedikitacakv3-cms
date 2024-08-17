"use client"

import Link from 'next/link';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CakeIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useEffect, useState } from 'react';
import { fetchRoles, fetchCurrentUser } from '@/app/lib/fetch';

export default function CreateForm() {
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRolesData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchRoles();
        console.log(fetchedData);
        setRoles(fetchedData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }
    const fetchCurrentUserData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchCurrentUser();
        console.log(fetchedData);
        setUser(fetchedData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRolesData();
    fetchCurrentUserData();
  }, []);

  return (
    <form className="flex justify-between gap-4">
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* User Name */}
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
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter user email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter user password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Check Password */}
        <div className="mb-4">
          <label htmlFor="checkpass" className="mb-2 block text-sm font-medium">
            Check Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="checkpass"
                name="checkpass"
                type="password"
                placeholder="Enter user password again"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Birth */}
        <div className="mb-4">
          <label htmlFor="birth" className="mb-2 block text-sm font-medium">
            Birth
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="birth"
                name="birth"
                type="text"
                placeholder="Enter user birthdate"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* User Linkedin */}
        <div className="mb-4">
          <label htmlFor="linkedin" className="mb-2 block text-sm font-medium">
            Linkedin
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder="Enter user linkedin"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* User Github */}
        <div className="mb-4">
          <label htmlFor="github" className="mb-2 block text-sm font-medium">
            Github
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="github"
                name="github"
                type="text"
                placeholder="Enter user github"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* User Role */}
        <div className="mb-4">
          <label htmlFor="role" className="mb-2 block text-sm font-medium">
            Choose role
          </label>
          <div className="relative">
            <select
              id="role"
              name="roleId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              {loading ? (
                <option value="" disabled>
                  Loading data ...
                </option>
              ) : (
                <>
                <option value="" disabled>
                  Select a role
                </option>
                {roles?.map((role: any) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
                </>
              )}
            </select>
            <SwatchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/post"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create User</Button>
        </div>
      </div>
    </form>
  );
}
