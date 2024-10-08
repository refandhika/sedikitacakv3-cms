"use client"

import Image from 'next/image';
import { UpdateTech, DeleteTech } from '@/app/ui/techs/buttons';
import TechStatus from '@/app/ui/techs/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchAllTechs } from '@/app/lib/fetch';
import { useEffect, useState } from 'react';

const TechsTable = ({
  query,
  currentPage,
  currentLimit
}: {
  query: string;
  currentPage: number;
  currentLimit: number;
}) => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllTechs(query, currentPage, currentLimit);
        setTechs(fetchedData);
      } catch (err) {
        console.error('Failed to fetch techs:', err);
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
            {techs?.map((tech: any) => (
              <div
                key={tech.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{tech.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{tech.icon}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(tech.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTech id={tech.id} />
                    <DeleteTech id={tech.id} onDelete={triggerRefetch} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Image Link
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
              {techs?.map((tech: any) => (
                <tr
                  key={tech.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{tech.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {tech.icon}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(tech.created_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTech id={tech.id} />
                      <DeleteTech id={tech.id} onDelete={triggerRefetch} />
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

export default TechsTable;