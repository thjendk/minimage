import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [images, setFiles] = useState(null);

  const handleUpload = async () => {
    const data = new FormData();
    data.append("image", images[0]);

    await axios.post("/api/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div>
      <form>
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <button disabled={!images} onClick={() => handleUpload()}>
          Upload
        </button>
      </form>
    </div>
  );
}
