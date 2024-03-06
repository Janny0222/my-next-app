'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { getSpecificUser } from '@/app/lib/data';
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';



// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  // { name: `${getUser}`, href: '#', icon: UserIcon },
  
];

export default function NavLinks() {
 
  const pathname = usePathname();
  return (  
    
      <>
      {links.map((paraName) => {
        const LinkIcon = paraName.icon;
        return (
          <>
          <Link
            key={paraName.name}
            href={paraName.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
            {
              'bg-green-500  text-white': pathname === paraName.href,
            },
            )}
          >
          <LinkIcon className="w-6" />
            <p className="hidden md:block">{paraName.name}</p>
          </Link>
          
          </>
          
        );
      })}
    </>
  );
}
