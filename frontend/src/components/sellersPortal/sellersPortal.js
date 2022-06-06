import { useState } from "react";
import PostService from "../../services/post.service";
import "./styles.css";

export const SellersPortal = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  let arr = [];
  arr.push(selectedImage);
  let url = URL.createObjectURL(new File(arr, "image"));

  const postPicture = async () => {
    try {
      await PostService.submitPost(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="photoUpload">
        <img alt="not found" width={"250px"} src={url} />
        <h1>UPLOAD PROPERTY PICTURES</h1>
        <input
          type="file"
          name="myImage"
          multiple
          accept="image/*"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
        <button onClick={postPicture}>Submit</button>
      </div>
    </div>
  );
};
