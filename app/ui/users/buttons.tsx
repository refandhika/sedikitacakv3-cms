import { deleteUser } from '@/app/lib/fetch';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FormEvent } from 'react';

export function CreateUser() {
  return (
    <Link
      href="/dashboard/users/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create User</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateUser({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/users/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUser({ id, onDelete }: { id: string, onDelete: () => void }) {
  const handleDelete = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const deleteResponse = await deleteUser(id);
      // alert(deleteResponse);
      alert("Delete success!");
      onDelete();
    } catch (err) {
      console.error('Failed to delete users:', err);
    }
  };

  return (
    <>
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
        onClick={handleDelete}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
