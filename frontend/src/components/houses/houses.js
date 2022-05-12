import house from "../../assets/house.jpg";

export const Houses = () => {
  return [...Array(8)].map((e, i) => (
    <div className="card" style={{ width: "18rem" }} key={i}>
      <img className="card-img-top" src={house} alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">Kilimani</h5>
        <h6 className="card-subtitle mb-2 text-muted">120,000/= pm</h6>
        <p className="card-text">
          This is a 4br apartment located in the heart of Kilimani
        </p>
        <a href="#" className="card-link">
          Details
        </a>
      </div>
    </div>
  ));
};
