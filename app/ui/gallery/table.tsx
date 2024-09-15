"use client"

import Image from 'next/image';
import { DeleteImage } from '@/app/ui/gallery/buttons';
import { fetchAllImages } from '@/app/lib/fetch';
import { useEffect, useState } from 'react';

const ImageGrid = ({
  query,
  currentPage,
  currentLimit
}: {
  query: string;
  currentPage: number;
  currentLimit: number;
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchAllImages(query, currentPage, currentLimit);
        setImages(fetchedData);
      } catch (err) {
        console.error('Failed to fetch images:', err);
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
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images?.map((image: any, index: number) => (
              <div key={index} className="relative">
                <img className="rounded-lg w-full h-auto object-cover" src={"https://api.sedikitacak.com" + image.fileloc + "/" + image.filename} alt="" />
                <div className="absolute bottom-2 right-2">
                  <DeleteImage id={image.filename} onDelete={triggerRefetch} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGrid;