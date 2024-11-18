import { gql, useQuery } from "@apollo/client";
import { GetViewerResponse } from "./types";

const query = gql`
  query {
    viewer {
      login
      avatarUrl
    }
  }
`;

function GitHubHeader() {
  const { data: body, loading: isLoading } = useQuery<GetViewerResponse>(query);

  if (isLoading || body === undefined) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <h3>Header</h3>
      <div>
        <img alt="avatar" src={body.viewer.avatarUrl} />
      </div>
      <p>{body.viewer.login}</p>
    </>
  );
}

export default GitHubHeader;
