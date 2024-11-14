import { Link } from "react-router-dom";
import { getPosts, Post, savePost } from "../api/posts";
import NewPostPage from "./NewPostPage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function PostsPage() {
  const queryClient = useQueryClient();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPosts,
  });

  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess: (post) => {
      queryClient.setQueryData(["postsData"], (old: Post[]) => [...old, post]);
    },
  });

  const posts = data as Post[];

  return (
    <>
      <h2>Posts</h2>
      {isLoading && <p>...Loading</p>}
      {isFetching && <p>...Fetching</p>}
      {posts?.map((post) => (
        <p>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </p>
      ))}
      <NewPostPage onSave={mutate} />
    </>
  );
}

export default PostsPage;
