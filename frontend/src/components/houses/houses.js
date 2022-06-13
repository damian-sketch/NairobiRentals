import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import house from "../../assets/house.jpg";
import postService from "../../services/post.service";
import { useState } from "react";
export const Houses = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  // IIFE to fetch all data
  (async function () {
    let housedata = await postService.getAllPosts();
    setData(housedata);
    // console.log(data);
  })();

  return [...data].map((e, i) => (
    <div className="card" style={{ width: "18rem" }} key={i}>
      <img className="card-img-top" src={e.photos} alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">Kilimani</h5>
        <h6 className="card-subtitle mb-2 text-muted">120,000/= pm</h6>
        <p className="card-text">
          This is a 4br apartment located in the heart of Kilimani
        </p>
        <Link to={`/details/${i}`} className="card-link">
          Details
        </Link>
      </div>
    </div>
  ));
};
