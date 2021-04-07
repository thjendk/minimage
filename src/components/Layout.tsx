import Div100vh from "react-div-100vh";

export default function Layout({ children }: { children: any }) {
  return (
    <div>
      <Div100vh className="dark:text-white flex flex-col">
        <div className="flex flex-col flex-grow">{children}</div>
      </Div100vh>
    </div>
  );
}
