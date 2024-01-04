import { useState } from "react";

const useImageUploader = () => {
  const [picture, setPicture] = useState(null);

  const handleImageChange = (event) => {
    const inputField = event.target;
    const [file] = inputField.files;
    if (file) {
      setPicture(URL.createObjectURL(file));
    }
  };
  return {
    picture,
    handleImageChange,
  };
};

export default useImageUploader;
