import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { ReduxState } from "store";
import authReducer from "store/auth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const user = useSelector((state: ReduxState) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (values: { username: string; password: string }) => {
    await axios.post("/api/login", values);
    const res = await axios.get("/api/user");
    if (!res.data) return;
    dispatch(authReducer.actions.setUser(res.data));
    history.push("/");
  };

  if (user) return <Redirect to="/" />;
  return (
    <div className="page-center">
      <div className="container gradient">
        <h1>Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
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
