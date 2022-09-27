import "./App.css";
import { Registration } from "./components/registration/registration";
import { Login } from "./components/login/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Posts } from "./components/posts/posts";
import { Houses } from "./components/houses/houses";
import { Header } from "./components/header/header";
import { HouseDetails } from "./components/details/details";
import { PostHouse } from "./components/sellersPortal/postHouses/postHouse";
import { SellersLogin } from "./components/sellersPortal/sellersLogin/login";
import { SellersRegistration } from "./components/sellersPortal/sellersRegister";
import { ResetPassword } from "./components/resetPassword";
import { ChangePassword } from "./components/changePassword";

const App = () => {
  return (
    <>
      <Header />
      <div className="wrapperDiv">
        <Routes>
          <Route path="/sellers/register" element={<SellersRegistration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellers/login" element={<SellersLogin />} />
          <Route path="/" element={<Posts />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/details/:id" element={<HouseDetails />} />
          <Route path="/portal/post-house" element={<PostHouse />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ChangePassword />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
