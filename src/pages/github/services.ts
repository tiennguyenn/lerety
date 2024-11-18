import {
  AddStarReponse,
  GetRepoResponse,
  GetViewerResponse,
  SearchFormData,
} from "./types";

const url = process.env.REACT_APP_GITHUB_API_URL!;

const token = process.env.REACT_APP_GITHUB_TOKEN;

const query = `
  query {
    viewer {
      login
      avatarUrl
    }
  }
`;

export async function getViewer() {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = (await response.json()) as unknown;
  assertIsGetViewerResponse(body);
  return body;
}

function assertIsGetViewerResponse(
  body: any
): asserts body is GetViewerResponse {
  const error = new Error("Response body is invalid");

  if (!("data" in body)) {
    throw error;
  }

  if (!("viewer" in body.data)) {
    throw error;
  }
}

const repoQuery = `
  query($owner: String!, $name: String!) {
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

export async function getRepo(owner: string, name: string) {
  const response = await fetch(url, {
    body: JSON.stringify({ query: repoQuery, variables: { owner, name } }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = (await response.json()) as GetRepoResponse;
  return body;
}

const starQuery = `
  mutation($repoId: ID!) {
    addStar({input: {starableId: $repoId}}) {
      starable: {
        stargezers: {
          totalCount
        }
      }
    }
  }
`;

export async function addStar(repoId: string) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: starQuery,
      variables: { repoId },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  console.log(body);
  return body;
}
