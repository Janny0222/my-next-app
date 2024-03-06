import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { getSpecificUser } from '@/app/lib/data';

export default async function SideNav() {
  const getUser = await getSpecificUser()
  
  return (
    <div className="flex flex-col h-full px-3 py-4 md:px-2">
      <Link
        className="flex items-end justify-start h-20 p-4 mb-2 bg-green-700 rounded-md md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex flex-row justify-between space-x-2 grow md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
            <UserIcon className="w-6" />
            <div className="hidden md:block">{getUser.name}</div>
          </button>
        <div className="hidden w-full h-auto rounded-md grow bg-gray-50 md:block"></div>
        <form action={async () => {
          'use server';
          await signOut();
        }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
