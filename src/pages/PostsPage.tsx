import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getPosts, NewPost, Post, savePost } from "../api/posts";
import NewPostPage from "./NewPostPage";

function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { reset } = useForm<NewPost>();

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
      <NewPostPage onSave={onSubmit} />
    </>
  );
}

export default PostsPage;
