"use client"

import Image from 'next/image';
import { UpdateSetting, DeleteSetting } from '@/app/ui/settings/buttons';
import SettingStatus from '@/app/ui/settings/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchAllSettings } from '@/app/lib/fetch';
import { useEffect, useState } from 'react';

const SettingsTable = ({
  query,
  currentPage,
  currentLimit
}: {
  query: string;
  currentPage: number;
  currentLimit: number;
}) => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllSettings(query, currentPage, currentLimit);
        setSettings(fetchedData);
      } catch (err) {
        console.error('Failed to fetch setting:', err);
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
            {settings?.map((setting: any) => (
              <div
                key={setting.param}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{setting.param}</p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>{setting.value}</p>
                    </div>
                    <p className="text-sm text-gray-500">{setting.note}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(setting.created_at)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSetting id={setting.param} />
                    <DeleteSetting id={setting.param} onDelete={triggerRefetch} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Parameter
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Value
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
              {settings?.map((setting: any) => (
                <tr
                  key={setting.param}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{setting.param}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {setting.value}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(setting.created_at)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSetting id={setting.param} />
                      <DeleteSetting id={setting.param} onDelete={triggerRefetch} />
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

export default SettingsTable;