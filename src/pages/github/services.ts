import { GetViewerResponse } from "./types";

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

const repoQuery = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      description
      stargazers {
        totalCount
      }
    }
  }
`;

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
