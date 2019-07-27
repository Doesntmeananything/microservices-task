const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const app = express();

const client = redis.createClient(6379);

client.on("error", err => {
  console.log("Error " + err);
});

app.get("/top", (req, res) => {
  // key to store results in Redis store
  const authorsRedisKey = "authors";

  // Try fetching the result from Redis first in case we have it cached
  return client.get(photosRedisKey, (err, authors) => {
    // If that key exists in Redis store
    if (authors) {
      return res.json({ source: "cache", data: JSON.parse(authors) });
    } else {
      // Key does not exist in Redis store

      // Fetch directly from remote api
      fetch("https://jsonplaceholder.typicode.com/authors")
        .then(response => response.json())
        .then(photos => {
          // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
          client.setex(photosRedisKey, 3600, JSON.stringify(authors));

          // Send JSON response to client
          return res.json({ source: "api", data: authors });
        })
        .catch(error => {
          // log error message
          console.log(error);
          // send error to the client
          return res.json(error.toString());
        });
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log("Server listening on port: ", 3000);
});
