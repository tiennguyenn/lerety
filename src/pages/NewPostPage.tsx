import { useForm } from "react-hook-form";
import { NewPost, savePost } from "../api/posts";
import { useDispatch } from "react-redux";

function NewPostPage() {
  const { register, handleSubmit } = useForm<NewPost>();
  const dispatch = useDispatch();

  const onSubmit = async (newPost: NewPost) => {
    try {
      await savePost(newPost);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
