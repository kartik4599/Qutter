import Avatar from "@components/Avatar";
import useLoginModal from "@hooks/useLoginModal";
import { Post } from "@hooks/usePosts";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface PostCardProps {
  data: Post;
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.userId}`);
    },
    [router, data.userId]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      loginModal.onOpen();
    },
    [router, data.userId]
  );

  const createAt = useMemo(() => {
    if (!data.createdAt) null;
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3 ">
        <Avatar userId={data.userId} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span onClick={goToUser} className="text-neutral-500 text-sm">
              {createAt}
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-pink-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-pink-500">
              <AiOutlineHeart size={20} />
              <p>{data.comments.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
