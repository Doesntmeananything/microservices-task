module.exports = {
  apps: [
    {
      name: "web-service",
      script: "web-service/web-service.js",
      env_production: {
        NODE_ENV: "production"
      },
      exec_mode: "cluster"
    },
    {
      name: "processor-service",
      script: "processor-service/processor-service.js",
      env_production: {
        NODE_ENV: "production"
      },
      exec_mode: "cluster"
    },
    {
      name: "cache-service",
      script: "cache-service/server.js",
      env_production: {
        NODE_ENV: "production"
      },
      exec_mode: "cluster"
    }
  ]
};
