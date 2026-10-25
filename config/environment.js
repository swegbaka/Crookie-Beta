function configurationError(message) {
  const error = new Error(`Configuration error: ${message}`);
  error.name = "ConfigurationError";
  return error;
}

function integer(value, fallback, name, max) {
  const input = value === undefined || value === "" ? String(fallback) : String(value);
  if (!/^\d+$/.test(input) || !Number.isSafeInteger(Number(input)) ||
      Number(input) < 1 || Number(input) > max) {
    throw configurationError(`${name} must be an integer between 1 and ${max}.`);
  }
  return Number(input);
}

function loadConfig(env = process.env) {
  const nodeEnv = env.NODE_ENV || "development";
  if (!["development", "test", "production"].includes(nodeEnv)) {
    throw configurationError("NODE_ENV must be development, test, or production.");
  }

  let database = env.DATABASE;
  if (!database || !/^mongodb(\+srv)?:\/\//.test(database)) {
    throw configurationError("DATABASE must be a mongodb:// or mongodb+srv:// connection string.");
  }
  if (database.includes("<password>")) {
    if (!env.DATABASE_PASSWORD) {
      throw configurationError("DATABASE_PASSWORD is required when DATABASE contains <password>.");
    }
    database = database.replace("<password>", encodeURIComponent(env.DATABASE_PASSWORD));
  }

  const jwtSecret = env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.trim().length < 32) {
    throw configurationError("JWT_SECRET must contain at least 32 characters.");
  }
  const jwtExpiresIn = env.JWT_EXPIRES_IN || "1d";
  // Explicit units prevent an unqualified string being interpreted as milliseconds.
  if (!/^[1-9]\d*(ms|s|m|h|d|w|y)$/.test(jwtExpiresIn)) {
    throw configurationError("JWT_EXPIRES_IN must be a positive duration with units, such as 1d or 12h.");
  }

  return {
    nodeEnv,
    port: integer(env.PORT, 3000, "PORT", 65535),
    database,
    jwtSecret,
    jwtExpiresIn,
    jwtCookieExpiresIn: integer(env.JWT_COOKIE_EXPIRES_IN, 1, "JWT_COOKIE_EXPIRES_IN", 3650),
  };
}

function loadEmailConfig(env = process.env) {
  if (!env.EMAIL_HOST || !env.EMAIL_FROM) {
    throw configurationError("Set EMAIL_HOST and EMAIL_FROM to enable password-reset email.");
  }
  if (Boolean(env.EMAIL_USERNAME) !== Boolean(env.EMAIL_PASSWORD)) {
    throw configurationError("Set both EMAIL_USERNAME and EMAIL_PASSWORD, or leave both empty.");
  }
  const port = integer(env.EMAIL_PORT, 587, "EMAIL_PORT", 65535);
  return {
    host: env.EMAIL_HOST,
    port,
    secure: port === 465,
    from: env.EMAIL_FROM,
    auth: env.EMAIL_USERNAME
      ? { user: env.EMAIL_USERNAME, pass: env.EMAIL_PASSWORD }
      : undefined,
  };
}

module.exports = { loadConfig, loadEmailConfig };
