# bun-server

A small Bun HTTP server, plus a Python script that signs in to Twitter (X) with OAuth 1.0a and prints the authorized account.

## What it does

`server.ts` listens on `PORT` (default `3000`).

- `GET /` returns `200` and the plain text `Welcome to Bun Server running on Vercel!`
- Any other path returns `404` and the plain text `404 Not Found`

`getmev2.py` loads `CONSUMER_KEY` and `CONSUMER_SECRET` from the environment (a `.env` file in this directory). It runs Twitter’s OAuth 1.0a PIN flow, then calls `GET https://api.twitter.com/2/users/me` with `user.fields=created_at,description` and prints the JSON.

## Stack

- [Bun](https://bun.sh) — TypeScript HTTP server in `server.ts`
- Python 3 — `requests`, `requests-oauthlib`, and `python-dotenv` in `getmev2.py`
- [Vercel](https://vercel.com) — `vercel.json` sends every path to `server.ts` with the `@vercel/node` builder (Node.js 18). The `nodeVersion` line contains a `//` comment, so the file is not valid JSON until that comment is removed.
- GitHub Actions — every push checks out the repo, installs Bun, and runs `server.ts` for 30 seconds. A separate manual workflow (`workflow_dispatch`) writes `CONSUMER_KEY` and `CONSUMER_SECRET` from repository secrets into `.env` and starts `getmev2.py`.

## Run the server

Install [Bun](https://bun.sh/docs/installation), then from this directory:

```bash
bun server.ts
```

Open http://localhost:3000. To use another port:

```bash
PORT=4000 bun server.ts
```

## Run the Twitter script

The script is interactive. It needs a Twitter app consumer key and secret. You paste a PIN from the browser.

```bash
python3 -m pip install requests requests-oauthlib python-dotenv
```

Create a `.env` file in this directory and do not commit it:

```
CONSUMER_KEY=your_key
CONSUMER_SECRET=your_secret
```

```bash
python3 getmev2.py
```

Open the printed authorization URL, approve the app, and paste the PIN when asked. The script then prints the `/2/users/me` response.

## License

MIT. See [LICENSE](LICENSE).
