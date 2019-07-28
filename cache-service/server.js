const express = require("express");
const redis = require("redis");
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });
const { fetchTopAuthors } = require("./db");

const app = express();

const client = redis.createClient(process.env.REDIS_URL);

client.on("error", err => {
  console.log("Error " + err);
});

const authorsRedisKey = "authors";

// Fetch directly from remote api once a minute
setInterval(() => {
  fetchTopAuthors()
    .then(authors => {
      // Save the API response in Redis store with an expiry date of 60 seconds
      client.setex(authorsRedisKey, 60, JSON.stringify(authors));
    })
    .catch(error => {
      console.log(error);
      return res.json(error.toString());
    });
}, 60 * 1000);

app.get("/cache/top5", (req, res) => {
  // Try fetching the result from Redis first in case we have it cached
  return client.get(authorsRedisKey, (err, authors) => {
    if (authors) {
      return res.json({ source: "cache", data: JSON.parse(authors) });
    } else {
      return res.json({ source: "cache", data: [] });
    }
  });
});

const PORT = process.env.CACHE_SERVICE_PORT || 3000;

// app.listen(PORT, "0.0.0.0", () =>
//   console.log("Caching server listening on port: ", PORT)
// );

app.listen(PORT, () => console.log("Caching server listening on port: ", PORT));
