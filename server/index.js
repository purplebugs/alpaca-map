import dotenv from "dotenv";
const config = dotenv.config();
import express from "express";
import { Client } from "@elastic/elasticsearch";

const app = express();
const PORT = process.env.PORT || 3001;

// Ref https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html
const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/all", async (req, res) => {
  // send list of all public alpacas, eg /api/all?from=0&size=25
  const from = req.query.from ? req.query.from : 0;
  const size = req.query.size ? req.query.size : 25;

  const result = await client.search({
    index: "alpacas-enriched-with-public-farm-flag",
    from: from,
    size: size,
    query: {
      match: {
        "farmType.public": true,
      },
    },
  });

  const response = result.hits.hits;
  console.log(response);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
