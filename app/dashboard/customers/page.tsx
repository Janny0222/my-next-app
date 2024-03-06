import { Metadata } from "next";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateCustomer } from "@/app/ui/customers/buttons";
import { Suspense} from "react";
import Search from "@/app/ui/search";
import { lusitana } from "@/app/ui/fonts";
import CustomersTable from "@/app/ui/customers/table";
import { fetchFilteredCustomers, fetchInvoicesPages } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { useSession } from "next-auth/react";

export const metadata: Metadata = {
    title: 'Customers',
}

export default async function Page( {
    searchParams,}:{
        searchParams?: {
            query?: string;
            page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvoicesPages(query);
    const customers = await fetchFilteredCustomers(query)
    return (
        <div className="w-full">
            <div className="flex items-center justify-between w-full">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                <Search placeholder="Search Customers..." />
                <CreateCustomer />
            </div>
                    <Suspense key = {query + currentPage} fallback={<InvoicesTableSkeleton />}>
                        <CustomersTable customers={customers} />
                    </Suspense>
                    <div className="flex justify-center w-full mt-5">
                        <Pagination totalPages={totalPages} />
                    </div>

        </div>
    );
}
