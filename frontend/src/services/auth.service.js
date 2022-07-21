import axios from "axios";

const API_URL = "https://househunters-express-server.herokuapp.com/";
export let success;
export let resonse;
class AuthService {
  async register(fullnames, username, email, password, seller) {
    return await axios
      .post(API_URL + "register", {
        fullnames,
        username,
        email,
        password,
        seller,
      })
      .then((response) => {
        resonse = response;
        success = response.data.message;
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
}

export default new AuthService();
