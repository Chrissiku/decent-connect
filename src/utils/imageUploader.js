import { useState } from "react";

const useImageUploader = () => {
  const [picture, setPicture] = useState(null);

  const handleImageChange = (event) => {
    const inputField = event.target;
    const [file] = inputField.files;
    if (file) {
      const fileSize = file.size / 1024;
      if (fileSize > 700) {
        event.target.value = null;
        alert("Please select an image with a size less than 700KB.");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;
          setPicture(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  return {
    picture,
    handleImageChange,
  };
};

export default useImageUploader;
