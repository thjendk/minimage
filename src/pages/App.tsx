import { useSelector } from "react-redux";
import { ReduxState } from "store";
import { upperFirst } from "lodash";

export default function App() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  return (
    <div className="page-center">
      <p>Hello {upperFirst(user.username)}</p>
    </div>
  );
}
