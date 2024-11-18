import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GitHubHeader from "./GitHubHeader";
import GitHubSearch from "./GitHubSearch";

const url = process.env.REACT_APP_GITHUB_API_URL!;
const token = process.env.REACT_APP_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function GitHubPage() {
  return (
    <>
      <h2>GitHub page</h2>
      <ApolloProvider client={client}>
        <GitHubHeader />
        <GitHubSearch />
      </ApolloProvider>
    </>
  );
}

export default GitHubPage;
