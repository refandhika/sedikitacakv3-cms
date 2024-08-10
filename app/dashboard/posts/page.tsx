import { fetchPosts } from "@/app/lib/data";

async function Page() {
    const posts = await fetchPosts();

    return (
        <main>
            <h1>Posts Page</h1>
        </main>
    );
}

export default Page;