import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useImages = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await axios.get("/api/images");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return [images, fetchImages] as any;
};

export const useImage = (hex: string) => {
  const [image, setImage] = useState(null);

  const fetchImage = useCallback(async () => {
    const res = await axios.get(`/api/image?hex=${hex}`);
    setImage(res.data);
  }, [hex]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return [image, fetchImage] as any;
};
