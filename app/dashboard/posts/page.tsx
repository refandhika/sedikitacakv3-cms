import Table from "@/app/ui/posts/table";
import { CreatePost } from "@/app/ui/posts/buttons";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: number,
        limit?: number
    }
}) {
    const query = searchParams?.query || '';
    const currPage = searchParams?.page || 1;
    const currLimit = searchParams?.limit || 20;

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">
                Posts Page
            </h1>
            <div className="w-full">
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search posts..." />
                    <CreatePost />
                </div>
                <Suspense key={query + currPage} fallback={<InvoicesTableSkeleton />}>
                    <Table query={query} currentPage={currPage} currentLimit={currLimit} />
                </Suspense>
                <div className="mt-5 flex w-full justify-center">
                    {/* <Pagination totalPages={totalPages} /> */}
                </div>
            </div>
        </main>
    );
}

export default Page;