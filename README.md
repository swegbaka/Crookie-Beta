# Crookie

Gain happiness from cooking! Crookie is a beginner cooking prototype built with Express, EJS, and MongoDB.

The repository contains both an older static HTML prototype and an Express/EJS app. `npm start` runs the Express app: templates live in `views/`, public assets in `test/`, and API routes in `routes/`. The `test/` folder contains assets, not automated tests; automated checks live in `tests/`.

## Local setup

1. Install Node.js 22 or newer.
2. Install the locked dependencies:

   ```sh
   npm ci
   ```

3. Copy `.env.example` to `.env` in the repository root:

   ```powershell
   Copy-Item .env.example .env
   ```

   On macOS/Linux, use `cp .env.example .env`.

4. Generate a JWT secret and paste the output into `JWT_SECRET` in `.env`:

   ```sh
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

5. Start a local MongoDB server, or set `DATABASE` to your MongoDB Atlas connection string. Include the database name, such as `/Recipe`. For Atlas, allow your development machine in the cluster network settings.
6. Start Crookie:

   ```sh
   npm start
   ```

   Open http://localhost:3000, or the port configured in `PORT`. Use `npm run dev` for automatic restarts.

The server validates configuration first and starts listening only after MongoDB connects. Database selection times out after 10 seconds. Connection failures produce a generic message so credentials are not printed. An empty local database has no recipes; no seed/import command is currently provided.

## Configuration

Environment variables already set by your shell or hosting provider take precedence over `.env`. The file is always loaded from the repository root, regardless of the working directory. `.env` is ignored by Git.

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | `development` (default), `test`, or `production`. Production requires HTTPS for JWT cookies. |
| `PORT` | Listening port, 1–65535; default `3000`. |
| `DATABASE` | Required MongoDB URI, including the intended database name. |
| `DATABASE_PASSWORD` | Raw password, required only when `DATABASE` contains `<password>`. It is URL-encoded before substitution. Quote values containing `#` or spaces in `.env`. |
| `JWT_SECRET` | Required secret of at least 32 characters. Generate a unique random value. |
| `JWT_EXPIRES_IN` | Token lifetime with units, e.g. `1d` (default) or `12h`. |
| `JWT_COOKIE_EXPIRES_IN` | Cookie lifetime in days, 1–3650; default `1`. |
| `EMAIL_HOST`, `EMAIL_FROM` | SMTP hostname and sender address. Required only when requesting password-reset email. |
| `EMAIL_PORT` | SMTP port; default `587`. Port `465` uses implicit TLS. |
| `EMAIL_USERNAME`, `EMAIL_PASSWORD` | SMTP credentials; supply both or leave both empty for a local unauthenticated SMTP service. |

For local email testing, use a local SMTP capture service or your provider's sandbox credentials. No email is sent during startup or tests.

## Validation

```sh
npm test
```

Checks cover invalid/missing configuration, Atlas password escaping, optional SMTP settings, page rendering, JSON parsing, cookie settings, and startup behavior when MongoDB fails. They do not require a live database or SMTP server.

## Current limitations

Account authorization, browser login/signup integration, recipe filtering, and some navigation remain incomplete. These setup fixes do not make the account system ready for public deployment. The older static prototype only populates some recipe pages.

## Credits

- https://getcssscan.com/css-buttons-examples
- https://www.youtube.com/watch?v=42M9esAvAEU
- Additional recipe sources are listed in `citation.txt`.
