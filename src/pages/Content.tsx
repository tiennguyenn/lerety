import { useSelector } from "react-redux";
import { RootType } from "../store";

function Content() {
  const permissions = useSelector((state: RootType) => state.user.permissions);
  return (
    <>
      <h3>Content</h3>
      {permissions?.includes("admin") && <p>This is a content for admin</p>}
    </>
  );
}

export default Content;
