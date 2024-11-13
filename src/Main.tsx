import { User } from "./api/authenticate";
import Content from "./Content";

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

function Main({ user, permissions }: Props) {
  return (
    <>
      <h1>Main</h1>
      <Content user={user} permissions={permissions} />
    </>
  );
}

export default Main;
