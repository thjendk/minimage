import axios from "axios";
import { useImage } from "hooks/useImages";
import { useHistory, useParams } from "react-router";
import useClipboard from "react-use-clipboard";
const domain = process.env.PUBLIC_URL || "http://localhost:3000";

export default function Image() {
  const history = useHistory();
  const params = useParams<{ hex: string }>();
  const [image] = useImage(params.hex);
  const [isCopied, setCopied] = useClipboard(domain + image?.path);

  const handleDelete = async () => {
    await axios.post("/api/delete", { hex: params.hex });
    history.push("/");
  };

  if (!image) return <p>Loading...</p>;
  return (
    <div className="page-center">
      <div>
        <img src={image.path} alt="" />
        <button disabled={isCopied} onClick={setCopied}>
          {isCopied
            ? "Successfully copied to clipboard"
            : "Copy direct Image address"}
        </button>
        <button onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}
