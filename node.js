const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const mongoose = require("mongoose");
const { loadConfig } = require("./config/environment");

async function startServer() {
  // Validate before loading routes, connecting to MongoDB, or listening.
  const config = loadConfig();
  const app = require("./app");

  await mongoose.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  });

  return new Promise((resolve, reject) => {
    const server = app.listen(config.port, () => {
      console.log(`Crookie is running on port ${config.port}`);
      resolve(server);
    });
    server.once("error", reject);
  });
}

if (require.main === module) {
  startServer().catch(async (error) => {
    // Driver errors can contain credentials or connection details.
    console.error(
      error.name === "ConfigurationError"
        ? error.message
        : "Startup failed. Check database connectivity and whether PORT is available."
    );
    process.exitCode = 1;
    await mongoose.disconnect();
  });
}

module.exports = { startServer };
