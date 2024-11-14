import { useEffect, useState } from "react";
import { getPosts, NewPost, Post, savePost } from "../api/posts";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<NewPost>();

  useEffect(() => {
    try {
      setIsLoading(true);
      getPosts().then((data) => {
        setIsLoading(false);
        setPosts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = (newPost: NewPost) => {
    savePost(newPost)
      .then((post) => {
        setPosts([...posts, post]);
        reset();
      })
      .catch(console.log);
  };

  return (
    <>
      <h2>Posts</h2>
      {isLoading && <p>...Loading</p>}
      {posts?.map((post) => (
        <p>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </p>
      ))}

      <h3>New post</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        <textarea placeholder="Description" {...register("description")} />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default PostsPage;
