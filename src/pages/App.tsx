import { useSelector } from "react-redux";
import { ReduxState } from "store";
import { upperFirst } from "lodash";
import Images from "components/Images";
import Upload from "./Upload";

export default function App() {
  const user = useSelector((state: ReduxState) => state.auth.user);

  return (
    <div className="text-center">
      <h1>Hello {upperFirst(user.username)}. Here are your images.</h1>
      <hr />
      <Images />
      <hr />
      <Upload />
    </div>
  );
}
