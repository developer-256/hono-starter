# ⚡ Hono Backend Starter with Better Auth Integration

A modern backend starter built with **Hono**, **Drizzle ORM**, and **Bun** — now featuring **Better Auth** with **Google OAuth**, **Email OTP Authentication**, and **Resend** for email delivery.
It also includes a **Role-Based Access Control (RBAC)** system for secure, scalable authorization.

---

## 🚀 Features

- ⚡ **Blazing-fast** Hono + Bun setup
- 🧩 **Type-safe** Drizzle ORM with PostgreSQL
- 🔐 **Better Auth Integration**

  - Google OAuth login
  - Email OTP authentication via Resend
  - Pre-configured **RBAC (Role-Based Access Control)**

- 📧 **Resend** for transactional emails
- 🪲 **Sentry** for error tracking (optional)
- 🧱 Built-in **OpenAPI** documentation
- 🧪 Ready for production and scalable apps

---

## 🧠 Want the Frontend Too?

If you also want a **Next.js frontend** preconfigured with:

- Better Auth client
- Google & Email login pages
- TanStack Query
- OpenAPI Fetch client

👉 Use this repo instead:
[**Nextjs-and-Hono-with-Better-Auth**](https://github.com/m-umar-ch/Nextjs-and-Hono-with-Better-Auth)

---

## ⚙️ Installation

```bash
bun install
```

---

## 🧩 Environment Setup

Copy the example `.env` file and update it with your values:

```bash
cp .env.example .env
```

### 🧾 Updated Environment Variables

```bash
NODE_ENV="development"
PORT=9999
DATABASE_URL=""

# Email via Resend
RESEND_API_KEY=""

# Sentry (optional)
SENTRY_ENABLED=false
SENTRY_DSN=""

# Better Auth configuration
BETTER_AUTH_SECRET="E72QvTxvgSCqTW63nfAyb5zEXoVKmRgN"
BACKEND_BASE_URL="http://localhost:9999"
FRONTEND_BASE_URL="http://localhost:3000"

# Google OAuth credentials
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

---

## 🧭 Running the Application

### Development mode

```bash
bun run dev
```

### Build for production

```bash
bun run build
```

### Run production build

```bash
bun run start
```

---

## 📚 API Documentation

The server runs at:

- **Base URL:** `http://localhost:9999`
- **API Base:** `http://localhost:9999/api`
- **API Reference:** `http://localhost:9999/api/reference`

---

## 🗄️ Database Commands

<details>
<summary>Show database commands</summary>

### Generate migrations

```bash
bun run db:generate
```

### Run migrations

```bash
bun run db:migrate
```

### Push schema directly (for development)

```bash
bun run db:push
```

### Open Drizzle Studio

```bash
bun run db:studio
```

</details>

---

## 🪲 Error Monitoring with Sentry

To enable Sentry:

1. Set `SENTRY_ENABLED=true` in your `.env`
2. Add your `SENTRY_DSN` from your Sentry project
3. (Optional) Configure sampling or additional options in
   `src/lib/core/SENTRY_SETUP.md`

---

## 🧰 Tech Stack

| Tool            | Purpose                                 |
| --------------- | --------------------------------------- |
| **Hono**        | Lightning-fast web framework            |
| **Bun**         | Modern JavaScript runtime               |
| **Drizzle ORM** | Type-safe ORM for SQL databases         |
| **Better Auth** | Authentication + RBAC                   |
| **Resend**      | Email delivery for OTPs                 |
| **Sentry**      | Error tracking & performance monitoring |

---

## 🧑‍💻 Author

**Muhammad Umar Chaudhry**
🔗 [GitHub Profile](https://github.com/m-umar-ch)

⭐ If you find this starter useful, don’t forget to **star the repo**!
