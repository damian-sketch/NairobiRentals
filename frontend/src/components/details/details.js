import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import seller from "../../assets/seller.png";
import postService from "../../services/post.service";
import "./styles.css";

export const HouseDetails = () => {
  const [houseData, setHouseData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
    (async function () {
      const url = window.location.href;
      const regex = /details\/(.*)/;
      const match = regex.exec(url);
      const id = match[1].toString();
      let housedata = await postService.getAllPosts();
      setHouseData(housedata[id]);
    })();
  }, []);

  return (
    <div className="detailsWrapper">
      <div className="card" style={{ width: "58rem" }}>
        <img
          className="card-img-top"
          src={houseData.photos}
          alt="Card image cap"
        ></img>
      </div>
      <br />

      <div className="pageDetails">
        <div className="houseDetails">
          <ul>
            <h4>House details</h4>
            <li>Located in : {houseData.location}</li>
            <li>{houseData.bathrooms} bathrooms</li>
            <li>{houseData.bedrooms} bedrooms</li>
            <li>Price: {houseData.rent} per month</li>
            <li>Does this unit have a balcony? : {houseData.balcony}</li>
          </ul>
        </div>
        <div className="sellerDetails">
          <ul>
            <h4>Seller's profile</h4>
            <img className="sellerImg" src={seller} alt="Card image cap"></img>
            <li>Posted by:{houseData.owner}</li>
            <li>+2547847389938</li>
            <li>test@email.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
