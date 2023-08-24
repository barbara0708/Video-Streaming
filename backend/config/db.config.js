module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Kalambur0708",
    DB: "Video-Streaming-Platorm",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };