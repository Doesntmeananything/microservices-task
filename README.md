# Asynchronous Microservices with RabbitMQ and Node.js

This repo contains two microservices that perform database negotation and expose public API to interact with. The caching microservice related to them [can be found here](https://github.com/Doesntmeananything/cache-service).

## Description

- `web-service` acts as an entry point and serves an API that accepts HTTP requests
- `processor-service` receives requests through RabbitMQ channels and queries them against the Postgres database, updating it when needed
- microservices are managed by PM2, clustering and restarting them when required.

## Endpoints

Hosted at https://microservices-task.herokuapp.com

| Method | endpoint |                   Schema                    |                                                                        Result                                                                         |
| :----: | :------: | :-----------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|  GET   |  /top5   |                      -                      | Returns a cached array of 5 most productive authors (number of books that have pages > 200). Returns an empty array when no caching is yet performed. |
|  GET   | /authors |                      -                      |                    Returns a cached array of authors and their UUIDs. Can be used to get data needed to add books to the database.                    |
|  POST  | /author  |          {name: String, age: Int}           |                                    Adds given author to the database and returns the log of the database operation                                    |
|  POST  |  /book   | {authorId: UUID, title: String, pages: Int} |                                     Adds given book to the database and returns the log of the database operation                                     |
