const express = require("express");
const redis = require("redis");
const { fetchTopAuthors } = require("./db");

const app = express();

const client = redis.createClient(6379);

client.on("error", err => {
  console.log("Error " + err);
});

// key to store results in Redis store
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

const port = 3000;

app.listen(port, () => console.log("Server listening on port: ", port));
