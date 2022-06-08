import { useState } from "react";
import PostService from "../../services/post.service";
import "./styles.css";

export const SellersPortal = () => {
  const [newHouse, setNewHouse] = useState({
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    photos: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newHouse);
    await PostService.submitPost(newHouse);
  };
  const handleChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewHouse({ ...newHouse, photos: e.target.files[0] });
  };
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="photoUpload">
        <h1>UPLOAD PROPERTY PICTURES</h1>
        <input
          type="file"
          name="photos"
          multiple
          accept=".png, .jpg, .jpeg"
          onChange={handlePhoto}
        />
      </div>
      <div>
        <h3>Details</h3>
        Bathrooms:
        <input
          type="text"
          value={newHouse.bathrooms}
          onChange={handleChange}
          name="bathrooms"
        />
        Bedrooms:
        <input
          type="text"
          value={newHouse.bedrooms}
          onChange={handleChange}
          name="bedrooms"
        />
        Balcony:
        <input
          type="radio"
          id="yes"
          name="balcony"
          value="true"
          onChange={handleChange}
        />
        <label> yes</label>
        <input
          type="radio"
          id="no"
          name="balcony"
          value="false"
          onChange={handleChange}
        />
        <label> no</label>
        <input type="submit" />
      </div>
    </form>
  );
};
