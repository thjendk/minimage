import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { ReduxState } from "store";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const user = useSelector((state: ReduxState) => state.auth.user);
  const history = useHistory();

  const onSubmit = async (values: { username: string; password: string }) => {
    await axios.post("/api/login", values);
    history.push("/");
  };

  if (user) return <Redirect to="/" />;
  return (
    <div className="page-center">
      <div className="container gradient">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}
          className="flex flex-col gap-2 max-w-md m-auto"
        >
          <input {...register("username")} />
          <input {...register("password")} type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
