import axios from "axios";

const API_URL = "http://localhost:5000/";

class PostService {
  async submitPost(url) {
    return await axios.post(API_URL + "posts/submit-post", {
      url,
    });
  }

  getAllPosts() {
    axios.defaults.withCredentials = true;
    return axios.get(API_URL + "posts", { withCredentials: true });
  }
}

export default new PostService();
