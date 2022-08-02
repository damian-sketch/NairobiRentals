import { useEffect, useState } from "react";
import postService from "../../../services/post.service";
import storage from "../../../firebase.js";
import "./styles.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const PostHouse = () => {
  const [newHouse, setNewHouse] = useState({
    location: "",
    rent: "",
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    photos: "",
    owner: localStorage.getItem("user"),
  });
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/sellers/login");
    }
  }, []);
  let feedback = "";

  const handleChange = (e) => {
    setNewHouse({ ...newHouse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newHouse.photos) {
      toast.error("Please choose a photo first");
    }
    try {
      await postService.submitPost(newHouse).then((response) => {
        toast.success(response.message);
      });
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const handleUpload = async (e) => {
    let file = e.target.files[0];

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
    toast.success("Photo uploaded successfully");
  };

  return (
    <div className="postWrapper">
      <ToastContainer autoClose={3000} closeOnClick closeButton />
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
            onChange={handleUpload}
          />
        </div>
        <div className="postHouseDetails">
          <h3>Details</h3>
          <div className="indivDetails">
            Location:
            <input
              className="houseInput"
              type="text"
              value={newHouse.location}
              onChange={handleChange}
              name="location"
            />
          </div>
          <div className="indivDetails">
            Rent per month:
            <input
              className="houseInput"
              type="text"
              value={newHouse.rent}
              onChange={handleChange}
              name="rent"
            />
          </div>
          <div className="indivDetails">
            Bathrooms:
            <input
              className="houseInput"
              type="text"
              value={newHouse.bathrooms}
              onChange={handleChange}
              name="bathrooms"
            />
          </div>
          <div className="indivDetails">
            Bedrooms:
            <input
              className="houseInput"
              type="text"
              value={newHouse.bedrooms}
              onChange={handleChange}
              name="bedrooms"
            />
          </div>
          <div className="indivDetails">
            Balcony:
            <input
              className="houseInput"
              type="radio"
              id="yes"
              name="balcony"
              value="true"
              onChange={handleChange}
            />
            <label> yes</label>
            <input
              className="houseInput"
              type="radio"
              id="no"
              name="balcony"
              value="false"
              onChange={handleChange}
            />
            <label> no</label>
          </div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
