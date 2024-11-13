import { useRouteError } from "react-router-dom";
import Header from "../Header";

function isError(error: any): error is { statusText: string } {
  return "statusText" in error;
}

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h2>Error!</h2>
      {isError(error) && <p>{error.statusText}</p>}
    </>
  );
}

export default ErrorPage;
