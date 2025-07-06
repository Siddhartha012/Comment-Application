# 🗨️ Comment App

A full-stack **Next.js 15** application that allows authenticated users to create, reply, edit, soft-delete, and restore comments. Built using **NextAuth**, **Prisma**, **TailwindCSS**, and **Turbopack**. Also includes optional **Docker** support for containerized deployment.

---

## ✨ Features

- 🔐 **Authentication** via `next-auth`
- 🧵 **Threaded Comments** with reply support
- 📝 **Edit & Restore**: Comments editable within a 15-min window
- 🗑️ **Soft Delete**: Comments are soft-deleted and restorable
- 🧠 **Prisma ORM** with PostgreSQL or SQLite
- 🎨 **TailwindCSS** UI
- 🐳 **Docker Support** for consistent environments

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   └── comments/         # API routes for comment CRUD
│   └── comments/             # Client-side Comments page
├── components/               # Reusable components (CommentForm, CommentList, etc.)
├── lib/
│   ├── db.ts                 # Prisma Client
│   └── auth.ts               # NextAuth configuration
prisma/
├── schema.prisma             # Prisma schema
public/
.env                          # Environment variables
