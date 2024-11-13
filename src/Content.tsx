import { useAppContext } from "./AppContext";

function Content() {
  const { loading, permissions } = useAppContext();
  return (
    <>
      <h3>Content</h3>
      {loading && <p>...Loading</p>}
      {permissions?.includes("admin") && <p>This is a content for admin</p>}
    </>
  );
}

export default Content;
