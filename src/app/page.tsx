import { buttonVariants } from "@/components/ui/Button";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import { HomeIcon } from "lucide-react";
import PostFeed from "@/components/PostFeed";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const initialPosts = await db.post.findMany({
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subreddit: true,
      votes: true,
      author: true,
      comments: true,
    },
  });

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Browse r/all</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* subreddit feed */}
        <PostFeed initialPosts={initialPosts} subredditName="all" />

        {/* subreddit info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="h-4 w-4" /> Home
            </p>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal Breadit homepage. Come here to check in with your
                favourite communities.
              </p>
            </div>

            <a
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href="/r/create"
            >
              Create Community
            </a>
          </dl>
        </div>
      </div>
    </>
  );
}
