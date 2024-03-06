import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import InvoicesTable from "@/app/ui/invoices/table";
import { fetchInvoicesPages } from "@/app/lib/data";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { Lusitana } from "next/font/google";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Invoices',
}

export default async function Page({
    searchParams,}:{
        searchParams?: {
            query?: string;
            page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);
    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                <Search placeholder="Search Invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key = {query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <InvoicesTable query={query} currentPage={currentPage} />
             </Suspense>   
             <div className="flex justify-center w-full mt-5">
                <Pagination totalPages={totalPages} />
             </div>
        </div>
    )
}