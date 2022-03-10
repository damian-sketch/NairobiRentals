import axios from "axios";

const API_URL = "http://localhost:5000/";

class PostService {
   getAllPosts() {
    axios.defaults.withCredentials = true;
       return axios.get(API_URL + "posts", {withCredentials: true})
   }
}

export default new PostService()