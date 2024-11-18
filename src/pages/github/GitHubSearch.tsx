import { useForm } from "react-hook-form";
import { GetRepoResponse, RepoType, SearchFormData } from "./types";
import { addStar, getRepo } from "./services";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function GitHubSearch() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [searchCriteria, setSearchCriteria] = useState<SearchFormData>();

  const { data } = useQuery({
    enabled: searchCriteria !== undefined,
    queryKey: ["repo", searchCriteria],
    queryFn: () => getRepo(searchCriteria as SearchFormData),
  });

  const { mutate } = useMutation({
    mutationFn: addStar,
    onSuccess() {
      queryClient.setQueryData<GetRepoResponse>(
        ["repo", searchCriteria],
        (old) => {
          if (!old) {
            return undefined;
          }

          return {
            data: {
              repository: { ...old.data.repository, viewerHasStarred: true },
            },
          };
        }
      );
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = (search: SearchFormData) => {
    setSearchCriteria(search);
  };

  const repository = data?.data.repository;

  const onClickStar = () => {
    if (repository) {
      mutate(repository.id);
    }
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

      {repository && (
        <div>
          <p>Name: {repository.name}</p>
          <p>Description: {repository.description}</p>
          <p>Stars: {repository.stargazers.totalCount}</p>
          {!repository.viewerHasStarred && (
            <button onClick={onClickStar}>Star</button>
          )}
        </div>
      )}
    </>
  );
}

export default GitHubSearch;
