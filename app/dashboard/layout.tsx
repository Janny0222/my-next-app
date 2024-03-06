import SideNav from "../ui/dashboard/sidenav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | Greenstone Dashboard',
        default: 'Greenstone Dashboard'
    },
    description: 'The official Next.js Learn Dashboard with app Router.',
    metadataBase: new URL('https://my-next-app-ten-ashy.vercel.app/')
    
}

export default function Layout({ children }: {children: React.ReactNode}){
    return (
        <div className="flex flex-col h-scree md:flex-row md:overflow-hidden">
            <div className="flex-none w-full md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}