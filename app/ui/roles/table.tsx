"use client"

import Image from 'next/image';
import { UpdateRole, DeleteRole } from '@/app/ui/roles/buttons';
import RoleStatus from '@/app/ui/roles/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchAllRoles } from '@/app/lib/fetch';
import { useEffect, useState } from 'react';

const RolesTable = ({
  query,
  currentPage,
  currentLimit
}: {
  query: string;
  currentPage: number;
  currentLimit: number;
}) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllRoles(query, currentPage, currentLimit);
        setRoles(fetchedData);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, currentPage, currentLimit, refresh])

  const triggerRefetch = () => {
    setRefresh(prev => !prev);
  };

  if(loading){
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {roles?.map((role: any) => (
              <div
                key={role.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{role.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{role.email}</p>
                  </div>
                  <RoleStatus status={role.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {role.name}
                    </p>
                    <p>{formatDateToLocal(role.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateRole id={role.id} />
                    <DeleteRole id={role.id} onDelete={triggerRefetch} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Create Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {roles?.map((role: any) => (
                <tr
                  key={role.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{role.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(role.created_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRole id={role.id} />
                      <DeleteRole id={role.id} onDelete={triggerRefetch} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RolesTable;