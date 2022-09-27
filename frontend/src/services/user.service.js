import axios from "axios";

const API_URL = "https://househunters-express-server.herokuapp.com/";

class UserService {
  async getUserInfo(id) {
    return await axios
      .get(API_URL + "users/getInfo", {
        params: {
          name: id,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }
}

export default new UserService();
