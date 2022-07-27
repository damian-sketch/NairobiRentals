import axios from "axios";

const API_URL = "https://househunters-express-server.herokuapp.com/";
export let success;
export let resonse = "/";
class AuthService {
  async register(username, email, password, seller) {
    return await axios
      .post(API_URL + "register", {
        username,
        email,
        password,
        seller,
      })
      .then((response) => {
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async login(username, password) {
    axios.defaults.withCredentials = true;
    return await axios
      .post(API_URL + "login", {
        username,
        password,
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(username));
          localStorage.getItem("user");
        }
        return response.data;
      });
  }
  async logout() {
    localStorage.removeItem("user");
  }

  async loginWithGoogle(token) {
    return await axios
      .post(API_URL + "auth/google", {
        token: token,
      })
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data.name));
          localStorage.getItem("user");
        }
        return response.data;
      });
  }
}

export default new AuthService();
