import axios from "axios";

const API_URL = "https://househunters-express-server.herokuapp.com/";

class PostService {
  async submitPost(newHouse) {
    return await axios
      .post(API_URL + "posts/submit-post", { newHouse })
      .then((response) => {
        return response.data;
      });
  }

  async getAllPosts() {
    return await axios
      .get(API_URL + "posts", { withCredentials: true })
      .then((response) => {
        let data = response.data;
        return data;
      });
  }

  async getSinglePost(id) {
    return await axios({
      method: "get",
      url: API_URL + "posts/post-details",
      data: id,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default new PostService();
