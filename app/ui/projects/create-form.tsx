"use client"

import Link from 'next/link';
import {
  ChatBubbleBottomCenterIcon,
  LinkIcon,
  SwatchIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fetchAllTechs, fetchCurrentUser, createProject } from '@/app/lib/fetch';
// @ts-ignore
import { useRouter } from 'next/navigation';

interface FormDataProject {
  title: string;
  content: string;
  source: string | null;
  url: string | null;
  demo: string | null;
  relevant: boolean;
  published: boolean;
  tech_ids: number[];
  order: number;
}

interface TechSet {
  id: number,
  name: string
}

export default function CreateForm() {
  const router = useRouter();
  const [techs, setTechs] = useState([]);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState<FormDataProject>({
    title: '',
    content: '',
    source: null,
    url: null,
    demo: null,
    relevant: false,
    published: false,
    tech_ids: [],
    order: 0
  });
  const [currTechs, setCurrTechs] = useState<TechSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTechChoice, setShowTechChoice] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let parseValue: any = value;
    if (name == "order") parseValue = parseInt(value);
    if (name != "techs"){
      if (type === "checkbox") {
        const { checked } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendResponse = await createProject(formData);
      router.push("/dashboard/projects");
    } catch (err) {
      console.error('Failed to submit project:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTechData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchAllTechs("", 0, 0);
        setTechs(fetchedData);
      } catch (err) {
        console.error('Failed to fetch techs:', err);
      } finally {
        setLoading(false);
      }
    }
    const fetchCurrentUserData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchCurrentUser();
        setUser(fetchedData);
        setFormData((prevData) => ({
          ...prevData,
          ["author_id"]: fetchedData.id,
        }));
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTechData();
    fetchCurrentUserData();
  }, []);

  const toggleTechChoice = () => {
    setShowTechChoice(prev => !prev);
  };

  const addTechsList = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    const parsedId = id ? parseInt(id) : 0;
    const name = target.innerText;
    
    let techs: number[] = [];
    techs.concat(formData.tech_ids);
    if (parsedId) techs.push(parsedId);

    let techsText: TechSet[] = [];
    techsText.concat(currTechs);
    if(parsedId) techsText.push({
      id: parsedId,
      name: name
    });

    setFormData((prevData) => ({
      ...prevData,
      ["tech_ids"]: techs,
    }));
    setCurrTechs(techsText);
    setShowTechChoice(prev => !prev);
  };

  const removeTechsList = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    const parsedId = id ? parseInt(id) : 0;
    const name = target.innerText;
    
    let techs: number[] = (formData.tech_ids).filter((item) => item !== parsedId);
    let techsText: TechSet[] = currTechs.filter((item) => item.id !== parsedId) ;

    setFormData((prevData) => ({
      ...prevData,
      ["tech_ids"]: techs,
    }));
    setCurrTechs(techsText);
    setShowTechChoice(prev => !prev);
  };

  return (
    <form className="flex justify-between gap-4" onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-3/4">

        {/* Project Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter project title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.title}
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Enter project content"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.content}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Project Source */}
        <div className="mb-4">
          <label htmlFor="source" className="mb-2 block text-sm font-medium">
            Source
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="source"
                name="source"
                type="text"
                placeholder="Enter project source"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.source ? formData.source : '' }
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Project URL */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            URL
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="url"
                name="url"
                type="text"
                placeholder="Enter project url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.url ? formData.url : '' }
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        
        {/* Project Demo */}
        <div className="mb-4">
          <label htmlFor="demo" className="mb-2 block text-sm font-medium">
            Demo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="demo"
                name="demo"
                type="text"
                placeholder="Enter project demo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.demo ? formData.demo : '' }
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Project Relevant */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="relevant" className="block text-sm font-medium">
            Relevant
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="relevant"
                name="relevant"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.relevant}
              />
            </div>
          </div>
        </div>
        
        {/* Project Published */}
        <div className="mb-4 flex gap-4 align-center">
          <label htmlFor="published" className="block text-sm font-medium">
            Published
          </label>
          <div className="relative rounded-md">
            <div className="relative">
              <input
                id="published"
                name="published"
                type="checkbox"
                className="peer block rounded-md border border-gray-200 outline-2"
                onChange={handleChange}
                checked={formData.published}
              />
            </div>
          </div>
        </div>

        {/* Project Techs */}
        <div className="mb-4 relative">
          <label htmlFor="techs" className="mb-2 block text-sm font-medium">
            Techs
          </label>
          <div className="relative">
            <input
              id="techs"
              name="techs"
              type="text"
              placeholder={currTechs.length === 0 ? "Choose project techs" : ""}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onClick={toggleTechChoice}
              readOnly={true}
            />
            <div className="absolute top-2 left-12">
              {currTechs?.map((currTech: any) => (
                <div 
                  className="px-2 py-1 text-xs bg-gray-100 flex justify-between items-center rounded-xl hover:bg-gray-200 transition-all"
                  key={currTech.id}
                >
                  {currTech.name}
                  <span 
                    className="pl-2 text-xs cursor-pointer"
                    data-id={currTech.id}
                    onClick={removeTechsList}
                  >X</span>
                </div>
              ))}
            </div>
            <SwatchIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div className="absolute w-full z-20">
            <ul
              className={"peer w-full cursor-pointer rounded-md border border-gray-200 text-sm outline-2 text-black transition-all" + (showTechChoice ? "visible opacity-100" : "hidden opacity-0")}
            >
              {loading ? (
                <li className="py-2 px-10 bg-white hover:bg-gray-100 transition-all">
                  Loading data ...
                </li>
              ) : (
                <>
                {techs?.map((tech: any) => (
                  <li 
                    className="py-2 px-10 bg-white hover:bg-gray-100 transition-all"
                    key={tech.id}
                    data-id={tech.id}
                    onClick={addTechsList}>
                    {tech.title}
                  </li>
                ))}
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Project Order */}
        <div className="mb-4">
          <label htmlFor="order" className="mb-2 block text-sm font-medium">
            Order
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="order"
                name="order"
                type="number"
                placeholder="Enter project order"
                className="peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                value={formData.order}
                min={0}
              />
            </div>
          </div>
        </div>

      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full md:w-1/4">
        <div className="flex gap-4">
          <Link
            href="/dashboard/projects"
            className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 w-fit"
          >
            Cancel
          </Link>
          <Button type="submit">Create Project</Button>
        </div>
      </div>
    </form>
  );
}
