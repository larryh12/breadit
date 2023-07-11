import { getAuthSession } from "@/lib/auth";
import type { Post, Vote, VoteType } from "@prisma/client";
import { notFound } from "next/navigation";
import PostVoteClient from "./PostVoteClient";

interface PostVoteServerProps {
  postId: string;
  initialVotesAmt?: number;
  initialVote?: VoteType;
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>;
}

const PostVoteServer = async ({
  postId,
  initialVotesAmt,
  initialVote,
  getData,
}: PostVoteServerProps) => {
  const session = await getAuthSession();

  let votesAmt: number = 0;
  let currentVote: VoteType | undefined = undefined;

  if (getData) {
    // fetch data in component
    const post = await getData();
    if (!post) return notFound();

    votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    currentVote = post.votes.find(
      (vote) => vote.userId === session?.user?.id
    )?.type;
  } else {
    // passed as props
    votesAmt = initialVotesAmt!;
    currentVote = initialVote;
  }

  return (
    <PostVoteClient
      postId={postId}
      initialVotesAmt={votesAmt}
      initialVote={currentVote}
    />
  );
};

export default PostVoteServer;
