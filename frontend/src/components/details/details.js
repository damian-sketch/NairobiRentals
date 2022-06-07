import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import house from "../../assets/house.jpg";
import seller from "../../assets/seller.png";
import "./styles.css";
export const HouseDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="detailsWrapper">
      <div className="card" style={{ width: "58rem" }}>
        <img className="card-img-top" src={house} alt="Card image cap"></img>
      </div>
      <br />

      <div className="pageDetails">
        <div className="houseDetails">
          <ul>
            <h4>House details</h4>
            <li>5 bathrooms</li>
            <li>4 bedrooms</li>
            <li>Open-plan kitchen</li>
            <li>Ceiling windows</li>
            <li>Price: 56k per month</li>
          </ul>
        </div>
        <div className="sellerDetails">
          <ul>
            <h4>Seller's profile</h4>
            <img className="sellerImg" src={seller} alt="Card image cap"></img>
            <li>Taques Muromo</li>
            <li>+2547847389938</li>
            <li>test@email.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
