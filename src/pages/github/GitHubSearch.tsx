import { useForm } from "react-hook-form";
import { RepoType, SearchFormData } from "./types";
import { addStar, getRepo } from "./services";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function GitHubSearch() {
  const { register, handleSubmit, watch } = useForm<SearchFormData>();

  //const [repo, setRepo] = useState<RepoType>();

  const nameFiled = watch("name");
  const ownerField = watch("owner");
  const { data } = useQuery({
    queryKey: ["repo", { nameFiled, ownerField }],
    queryFn: () => getRepo(ownerField, nameFiled),
    enabled: !!nameFiled,
  });

  const { mutate } = useMutation({
    mutationFn: addStar,
    onError() {
      queryClient.setQueryData(["repo", { nameFiled, ownerField }], (old) => {
        console.log(old);
        if (!old) {
          return null;
        }

        return { ...old, viewerHasStarred: true };
      });
    },
  });

  const queryClient = useQueryClient();

  const repo = data?.data.repository;

  const onSubmit = (search: SearchFormData) => {};

  const onClickStar = (repoId: string) => {
    mutate(repoId);
  };

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
        <div>
          <button type="submit">Search</button>
        </div>
      </form>

      {repo && (
        <div>
          <p>Name: {repo.name}</p>
          <p>Description: {repo.description}</p>
          <p>Stars: {repo.stargazers.totalCount}</p>
          {!repo.viewerHasStarred && (
            <button onClick={() => onClickStar(repo.id)}>Star</button>
          )}
        </div>
      )}
    </>
  );
}

export default GitHubSearch;
