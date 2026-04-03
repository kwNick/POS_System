This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo Video

[![Demo Video](../../../image.png)](https://youtu.be/HpIIT2wax2g)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 🔎 Why JWTs are useful even if they "disappear" on reload

1. They let the server verify trust without storing session state

Traditional sessions: server keeps a session record in memory/DB keyed by a cookie.

JWTs: server signs the token with its secret key → the server can trust the token’s claims (sub, roles, expiry, etc.) without needing to look anything up.

This makes your backend stateless: it doesn’t need to remember every user session.

2. They encode identity & claims

The sub (subject) claim usually holds the user ID.

Other claims can hold roles, permissions, or tenant/shop info.

That way, when your backend sees the token, it immediately knows:

who the user is

what they’re allowed to do

when the token expires
…without another DB query (unless you need fresh data).

3. They’re short-lived on purpose

Access tokens (JWTs) are meant to be temporary — often just 5–15 minutes.

They’re disposable because you always have a refresh token in a secure, HttpOnly cookie to get a new one.

This reduces the blast radius if a token ever leaks (an attacker only gets a few minutes of access).

4. Even though your React state clears on reload, the refresh cookie makes JWTs work long-term

The fact you "discard" the access token in memory is actually a security feature.

Instead of persisting a sensitive JWT in localStorage (which XSS could steal), you regenerate it on every reload using the refresh token (which is HttpOnly and inaccessible to JS).

The refresh cookie is what persists your login across reloads, not the access token.

5. They’re portable

If you had multiple backend services (API Gateway, microservices, etc.), you wouldn’t want each one to look up a user session in a central DB.

Instead, you issue one signed JWT → every service can independently verify and trust it.

✅ So the benefit is:

Security → short-lived tokens limit risk.

Statelessness → server doesn’t need to track sessions.

Portability → multiple services can trust the same token.

Efficiency → backend can trust the token immediately without extra DB lookups.

Your current flow (discard on reload, refresh for a new one) is the industry best practice:

Keep access tokens short-lived and in memory only.

Use refresh tokens in HttpOnly cookies for persistence.

That way, you get the benefits of JWTs without the security downsides of storing them in localStorage


### Alright — let’s dive into what’s inside a JWT and why it matters 👇

🔑 Structure of a JWT

A JWT is just three Base64URL-encoded parts:

header.payload.signature


Example (simplified):

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   // header
eyJzdWIiOiIxMjM0IiwidXNlcm5hbWUiOiJu... // payload
TJVA95OrM7E2cBab30RMHrHDcEfxJoZ...      // signature

1. Header

Specifies metadata about the token:

{
  "alg": "HS256",  // algorithm used to sign
  "typ": "JWT"     // type
}

2. Payload (Claims)

This is where the useful information goes.
Example for your app:

{
  "sub": "64f5a72c12ab",   // Subject: user ID
  "username": "nick",
  "roles": ["ADMIN", "USER"],
  "shops": ["shop123", "shop456"],
  "iat": 1735953000,       // issued at (epoch time)
  "exp": 1735956600        // expiration (epoch time)
}


sub → who the token belongs to (user ID is the best choice, not username/email).

username → optional, just for convenience.

roles → permissions for your frontend/backend checks.

shops → if a user has multiple shops, you could embed them.

iat/exp → lets the server reject expired tokens automatically.

3. Signature

The server takes the header + payload, signs it with its secret/private key, and attaches the signature.

When the backend receives the token, it recomputes the signature.

If the signature matches → the token is trusted (it hasn’t been tampered with).

🔎 Why this matters in your flow

Stateless Authentication
Your backend doesn’t need to look up a user session in a DB. The JWT itself carries identity + roles.

Fast Authorization
If a user hits GET /api/shops, the backend can just check:

Token is valid (signature matches).

Token isn’t expired.

roles includes "ADMIN" or "SHOP_OWNER".

→ No DB query required.

Portability
If you had multiple services (say an inventory service and an order service), they can all validate the same JWT without central session storage.

Short-lived, disposable
Even though you discard JWTs in React on refresh, the payload still matters because every request you make while the token is alive uses those claims.
Example: when you’re clicking around your dashboard, each request carries your JWT → backend trusts it instantly.

✅ TL;DR

Even if you throw JWTs away on reload:

They securely prove identity during a session.

They carry subject (sub), roles, and claims so the backend doesn’t need to hit the DB every time.

They’re self-contained: any service can validate them with just the signing key.

### Fetching from the client so that I can have refreshToken cookie

You had to fetch from the client so that your refreshToken cookie (which is marked as HttpOnly) would actually get sent back to your backend by the browser. Let’s break it down:

1. HttpOnly cookies can’t be read in JavaScript

You put the refresh token inside an HttpOnly cookie for security reasons (so document.cookie or React state can’t access it and expose it to XSS).

Because of this, your frontend code cannot directly grab the refresh token value and manually attach it in headers.

2. The browser handles cookies automatically on requests

When you make a request to your backend from the client (using fetch or axios), the browser automatically attaches cookies for that domain/path (including HttpOnly cookies).

This means the backend will receive the refresh token without you ever touching it on the frontend.

3. Why you couldn’t just do it on the server-side (Next.js server actions / API routes)?

If you only run a server action or API route without going through the browser, the request doesn’t carry your browser’s cookies by default.

That’s why you needed to trigger a client-side fetch—so that the browser would attach the refresh token cookie and send it to your Spring Boot backend.

4. Flow Recap

Login → backend sets refreshToken in an HttpOnly cookie.

Later, when access token expires → frontend makes a fetch('/api/auth/refresh').

Browser auto-includes refreshToken cookie.

Backend verifies refresh token → issues new access token → frontend gets it back (in response body or headers).

👉 In short:
You had to fetch from the client because that’s the only way to get the browser to attach the HttpOnly cookie with the refresh token when calling your backend.