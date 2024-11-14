import { useEffect, useState } from "react";
import { getPost, Post } from "../api/posts";
import { useParams } from "react-router-dom";

function PostPage() {
  const [post, setPost] = useState<Post>();
  const { id } = useParams();

  useEffect(() => {
    getPost(parseInt(id!)).then(setPost).catch(console.log);
  }, []);

  return (
    <>
      <h3>Post detail</h3>
      <p>{post?.title}</p>
      <p>{post?.description}</p>
    </>
  );
}

export default PostPage;
