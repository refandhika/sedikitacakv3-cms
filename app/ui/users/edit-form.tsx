"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CakeIcon,
  SwatchIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchUserByID, fetchRoles, fetchCurrentUser, updateUser } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

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

export default function EditForm({ id }: { id: string }) {
  const router = useRouter();
  const editId = id;
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataUser>({
    name: '',
    email: '',
    password: '',
    phone: '',
    birth: '',
    linkedin: '',
    github: '',
    role_id: 0
  });
  const [passCheck, setPassCheck] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    let intValue = 0;
    if (name == "checkpass") {
      setPassCheck(value);
      return;
    }
    if (name == "role_id") intValue = parseInt(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: intValue ? intValue : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(validateForm()){
        const sendResponse = await updateUser(formData, editId);
        router.push("/dashboard/users");
      }
    } catch (err) {
      console.error('Failed to submit users:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () : boolean => {
    if(formData.password != passCheck) {
      alert("Password mismatch!");
      return false;
    }
    return true;
  }

  useEffect(() => {
    const fetchUserDataByID = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchUserByID(editId);
        setFormData({
          name: fetchedData.name,
          email: fetchedData.email,
          password: '',
          phone: fetchedData.phone,
          birth: fetchedData.birth,
          linkedin: fetchedData.linkedin,
          github: fetchedData.github,
          role_id: fetchedData.role_id
        });
      } catch (err) {
        console.error(`Failed to fetch user ${id}:`, err);
      } finally {
        setLoading(false);
      }
    }
    const fetchRolesData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchRoles();
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
        setUser(fetchedData);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRolesData();
    fetchCurrentUserData();
    fetchUserDataByID();
  }, []);

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                value={formData.name}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                onChange={handleChange}
                value={formData.email}
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
                onChange={handleChange}
                value={formData.password}
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
                onChange={handleChange}
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
                onChange={handleChange}
                value={formData.birth}
              />
              <CakeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* User Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter user phone number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.phone}
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                onChange={handleChange}
                value={formData.linkedin}
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
                onChange={handleChange}
                value={formData.github}
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
              name="role_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
              defaultValue={formData.role_id ? formData.role_id : ''}
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
            href="/dashboard/users"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Update User</Button>
        </div>
      </div>
    </form>
  );
}
