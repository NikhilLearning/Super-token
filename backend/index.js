import supertokens from "supertokens-node";
import cors from "cors";
import { superTokenConfig } from "./config/supertoken.js";
import { verifySession } from "supertokens-node/recipe/session/framework/express/index.js";
import {middleware} from "supertokens-node/framework/express/index.js";


import express from 'express';
const app = express();

supertokens.init(superTokenConfig);

app.use(
  cors({
      origin: `http://localhost:4200`,
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      methods: ["GET", "PUT", "POST", "DELETE"],
      credentials: true,
  })
);

app.use(middleware())

const PORT = process.env.PORT || 3000; // Use the specified port or default to 3000

app.post("/signup1", async (req, res) => {
  res.send('Successfully');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});