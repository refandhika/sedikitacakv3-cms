"use client"

import { useState } from 'react';
import { uploadImage } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

const ImageUploadForm = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const sendResponse = await uploadImage(file);
        } catch (err) {
            console.error('Failed to submit post:', err);
        } finally {
            setLoading(false);
            alert("Upload image success!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full"
        >
            <div className="flex flex-row w-full justify-between items-center bg-gray-200 rounded-lg p-4">   
                <div className="flex flex-row gap-4 items-center">
                    <label htmlFor="file" className="font-bold">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white rounded-lg py-4 px-8">Upload</button>
            </div>
            {message && <span className="text-red-500 py-4">{message}</span>}
        </form>
    );
};

export default ImageUploadForm;