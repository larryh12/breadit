import PostFeed from "@/components/PostFeed";
import { buttonVariants } from "@/components/ui/Button";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { HomeIcon } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function page() {
  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];
  let whereClause = {};

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
    });
    followedCommunitiesIds = followedCommunities.map((sub) => sub.subredditId);
    whereClause = {
      subreddit: {
        id: {
          in: followedCommunitiesIds,
        },
      },
    };
  }

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
    where: whereClause,
  });

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* subreddit feed */}
        <PostFeed initialPosts={initialPosts} />

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
