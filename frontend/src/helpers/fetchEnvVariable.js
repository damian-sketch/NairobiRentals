import axios from "axios";

const API_URL = "https://househunters-express-server.herokuapp.com/";

export default async function fetchEnvVariable(variable) {
  return await axios.get(API_URL + "variables", {
    params: {
      name: variable,
    },
  });
}
