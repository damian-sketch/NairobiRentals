import { useState } from "react";
import PostService from "../../services/post.service";
import storage from "../../firebase.js";
import "./styles.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { message } from "../../services/post.service";

export const SellersPortal = () => {
  const [newHouse, setNewHouse] = useState({
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    photos: "",
  });
  let postServ = new PostService("");
  let feedback = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload();
    await postServ.submitPost(newHouse);
    feedback = postServ.message;
  };
  const handleChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setNewHouse({ ...newHouse, photos: e.target.files[0] });
  };

  const handleUpload = async () => {
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
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewHouse({ ...newHouse, photos: url });
        });
      }
    );
    return newHouse;
  };
  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <div className="photoUpload">
        <h1>UPLOAD PROPERTY PICTURES</h1>
        <p className={feedback.includes("Success") ? "success" : "danger"}>
          {feedback}
        </p>
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
