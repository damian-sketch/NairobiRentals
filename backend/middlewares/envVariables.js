import dotenv from "dotenv";

dotenv.config();

const variables = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

export default (variable) => variables[variable];
