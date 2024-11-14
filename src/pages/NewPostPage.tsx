import { useForm } from "react-hook-form";
import { NewPost } from "../api/posts";

type Props = {
  onSave: (newPost: NewPost) => void;
};

function NewPostPage({ onSave }: Props) {
  const { register, handleSubmit } = useForm<NewPost>();

  return (
    <>
      <h3>New post</h3>
      <form onSubmit={handleSubmit(onSave)}>
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

export default NewPostPage;
