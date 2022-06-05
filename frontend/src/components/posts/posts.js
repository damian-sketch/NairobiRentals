import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const Posts = () => {
  const navigate = useNavigate();
  function fetchPosts() {
    navigate("/houses");
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <div className="homeText">
        <h1>YOUR DREAM SPACE</h1>
        <p>Find your next rental home in Nairobi with just a few clicks</p>
        <button type="button" className="btn btn-primary" onClick={fetchPosts}>
          Explore
        </button>
      </div>
    </div>
  );
};
