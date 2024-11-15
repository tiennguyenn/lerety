import { getViewer } from "./services";
import { useQuery } from "@tanstack/react-query";

function GitHubHeader() {
  const { data: body, isLoading } = useQuery({
    queryKey: ["viewer"],
    queryFn: getViewer,
  });

  if (isLoading || body === undefined) {
    return <div>...Loading</div>;
  }

  const { viewer } = body.data;

  return (
    <>
      <h3>Header</h3>
      <div>
        <img alt="avatar" src={viewer.avatarUrl} />
      </div>
      <p>{viewer.login}</p>
    </>
  );
}

export default GitHubHeader;
