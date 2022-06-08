import axios from "axios";

const API_URL = "http://localhost:5000/";

class PostService {
  async submitPost(newHouse) {
    return await axios.post(API_URL + "posts/submit-post", { newHouse });
  }

  async getAllPosts() {
    return await axios.get(API_URL + "posts", { withCredentials: true });
  }
}

export default new PostService();
