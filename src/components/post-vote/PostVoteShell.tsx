import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "../ui/Button";

const PostVoteShell: FC = ({}) => {
  return (
    <div className="flex gap-6 p-6 items-center sm:flex-col sm:py-0 sm:w-10 sm:gap-0">
      {/* upvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
};

export default PostVoteShell;
