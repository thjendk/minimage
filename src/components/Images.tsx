import { useImages } from "hooks/useImages";
import { useHistory } from "react-router";

export default function Images() {
  const [images] = useImages();
  const history = useHistory();

  return (
    <div className="grid grid-cols-3">
      {images.map((i) => (
        <img
          src={i.path}
          alt=""
          className="border hover:border-black m-2 cursor-pointer"
          onClick={() => history.push(`/image/${i.hex}`)}
        />
      ))}
    </div>
  );
}
