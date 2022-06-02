import axios from "axios";

const API_URL = "http://localhost:5000/";

class AuthService {
  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
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
