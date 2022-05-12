import { useNavigate } from "react-router-dom";
import "./styles.css";

export const Posts = (props) => {
  const navigate = useNavigate();
  function fetchPosts() {
    navigate("/houses");
  }

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
