import { useForm } from "react-hook-form";
import { GetRepoResponse, SearchFormData } from "./types";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const query = gql`
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      viewerHasStarred
      stargazers {
        totalCount
      }
    }
  }
`;

const mutation = gql`
  mutation ($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

function GitHubSearch() {
  const { register, handleSubmit } = useForm<SearchFormData>();

  const [getRepo, { data, loading }] = useLazyQuery<GetRepoResponse>(query);

  const [starRepo] = useMutation(mutation);

  const onSubmit = (search: SearchFormData) => {
    getRepo({ variables: { ...search } });
  };

  const onClickStar = (repoId: string) => {
    if (repoId) {
      starRepo({ variables: { repoId } });
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

      {loading && <div>...Loading</div>}

      {data && (
        <div>
          <p>Name: {data.repository.name}</p>
          <p>Description: {data.repository.description}</p>
          <p>Stars: {data.repository.stargazers.totalCount}</p>
          {!data.repository.viewerHasStarred && (
            <button onClick={() => onClickStar(data.repository.id)}>
              Star
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default GitHubSearch;
