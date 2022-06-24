import axios from "axios";

const API_URL = "http://localhost:5000/";

export default async function fetchEnvVariable(variable) {
  return await axios.get(API_URL + "variables", {
    params: {
      name: variable,
    },
  });
}
