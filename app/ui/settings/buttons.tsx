import { deleteSetting } from '@/app/lib/fetch';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FormEvent } from 'react';

export function CreateSetting() {
  return (
    <Link
      href="/dashboard/settings/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Setting</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSetting({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/settings/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSetting({ id, onDelete }: { id: string, onDelete: () => void }) {
  const handleDelete = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const deleteResponse = await deleteSetting(id);
      // alert(deleteResponse);
      alert("Delete success!");
      onDelete();
    } catch (err) {
      console.error('Failed to delete setting:', err);
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
