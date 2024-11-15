import { useForm } from "react-hook-form";
import { SearchFormData } from "./types";

function GitHubSearch() {
  const { register, handleSubmit } = useForm<SearchFormData>();

  const onSubmit = (search: SearchFormData) => {};

  return (
    <>
      <h3>Search</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Owner</label>
          <input {...register("owner", { required: "Owner is required" })} />
        </div>
        <div>
          <label>Name</label>
          <input {...register("name", { required: "Name is required" })} />
        </div>
      </form>
    </>
  );
}
