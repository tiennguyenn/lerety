import { User } from "./api/authenticate";

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

function Content({ user, permissions }: Props) {
  if (!permissions) {
    return null;
  }

  return (
    <>
      <h2>Content</h2>
      {permissions.includes("admin") ? (
        <p>Welcome admin {user?.name}</p>
      ) : (
        <p>You are not a admin</p>
      )}
    </>
  );
}

export default Content;
