import { useState } from "react";
import "./styles.css";

export const SellersPortal = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  let arr = [];
  arr.push(selectedImage);
  return (
    <div className="container">
      <div className="photoUpload">
        <img
          alt="not found"
          width={"250px"}
          src={URL.createObjectURL(new File(arr, "image"))}
        />
        <h1>MONEY SHOWER NIGGA</h1>
        <input
          type="file"
          name="myImage"
          multiple
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};
