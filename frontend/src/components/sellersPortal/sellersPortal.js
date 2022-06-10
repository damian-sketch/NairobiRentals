import { useState } from "react";
import PostService from "../../services/post.service";
import storage from "../../firebase.js";
import "./styles.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const SellersPortal = () => {
  const [newHouse, setNewHouse] = useState({
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    photos: "",
  });
  const [percent, setPercent] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();
    console.log(newHouse.photos);
    await PostService.submitPost(newHouse);
  };
  const handleChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewHouse({ ...newHouse, photos: e.target.files[0] });
  };

  const handleUpload = () => {
    let file = newHouse.photos;
    if (!newHouse.photos) {
      alert("Please choose a photo first");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewHouse({ ...newHouse, photos: url });
        });
      }
    );
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
        <p>{percent} "% done"</p>
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
