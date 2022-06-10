import axios from "axios";

const API_URL = "http://localhost:5000/";

class PostService {
  constructor(message) {
    this.message = "";
  }
  async submitPost(newHouse) {
    return await axios
      .post(API_URL + "posts/submit-post", { newHouse })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message == "House uploaded successfully") {
          this.message = "Success!";
        } else {
          this.message = "Something went wrong!";
        }
      });
  }

  async getAllPosts() {
    return await axios.get(API_URL + "posts", { withCredentials: true });
  }
}

export default PostService;
