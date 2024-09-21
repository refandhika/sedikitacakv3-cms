'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BriefcaseIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  FilmIcon,
  IdentificationIcon,
  MusicalNoteIcon,
  Cog8ToothIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Posts',
    href: '/dashboard/posts',
    icon: DocumentDuplicateIcon
  },
  {
    name: 'Categories',
    href: '/dashboard/categories',
    icon: BriefcaseIcon
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: ComputerDesktopIcon
  },
  {
    name: 'Techs',
    href: '/dashboard/techs',
    icon: CpuChipIcon
  },
  {
    name: 'Hobby',
    href: '/dashboard/hobbies',
    icon: MusicalNoteIcon
  },
  {
    name: 'Gallery',
    href: '/dashboard/gallery',
    icon: FilmIcon
  },
  {
    name: 'User',
    href: '/dashboard/users',
    icon: UserGroupIcon
  },
  {
    name: 'Roles',
    href: '/dashboard/roles',
    icon: IdentificationIcon
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Cog8ToothIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href
                            }
                        )}
                    >
                        <LinkIcon className='w-6' />
                        <p className='hidden md:block'>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}