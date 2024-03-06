
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "../../ui/dashboard/revenue-chart";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { lusitana } from "../../ui/fonts";
import {fetchCardData } from "../../lib/data";
import { Suspense } from "react";
import { RevenueChartSkeleton, InvoiceSkeleton, CardSkeleton } from "@/app/ui/skeletons";
import { getSpecificUser } from "../../lib/data";
import email from "next-auth/providers/email";


export default async function Page() {
    const {numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();
    
    // if(getName.email)
    return(
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
              
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<InvoiceSkeleton />}>
                    <LatestInvoices />
                </Suspense>
                
            </div>
        </main>
    );
}