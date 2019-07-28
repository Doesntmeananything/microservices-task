module.exports = {
  apps: [
    {
      name: "web-service",
      script: "web-service/web-service.js",
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "processor-service",
      script: "processor-service/processor-service.js",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
