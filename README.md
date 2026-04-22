# 🛒 Offline-First Shopping List App (Expo + React Native)

## 📌 Overview

This project is a **React Native mobile application built using Expo (managed workflow)** that allows users to create and manage shopping lists with a strong focus on:

- Offline-first functionality
- Clean architecture
- Scalable state management
- Smooth mobile UX

The app works entirely offline using a local SQLite database and persists data across app restarts.

---

## 🚀 Tech Stack

- React Native (Expo SDK 54)
- TypeScript
- Expo Router (file-based navigation)
- Redux Toolkit (state management)
- SQLite (`expo-sqlite`) for local persistence

---

## 📱 Features

### ✅ Lists Management

- Create shopping lists with:
  - Name (required)
  - Priority (High / Medium / Low)
  - Optional color/icon
- View all lists
- Search lists by name

---

### ✅ Items Management (Per List)

- Add items (name required, quantity optional)
- Edit item details (name, quantity, notes)
- Mark items as completed
- Delete items (tap / swipe)
- Bulk actions:
  - Mark all as completed
  - Delete completed items

---

### ✅ Offline-First Storage

- Fully functional without internet
- Data persists after app restart
- Implemented using SQLite via Expo

---

### ✅ Navigation & Deep Linking

- Lists Screen
- List Details Screen
- Settings Screen

Deep linking supported:
myapp://list/:listId

---

### ✅ UX & UI

- Clean, mobile-first design
- Swipe gestures for actions
- Empty states:
  - “No lists yet”
  - “Add your first item”
- Loading and error handling states

---

## 🧠 Architecture

The project follows a **layered architecture** for maintainability and scalability:

UI (Screens / Components)
↓
Redux (State Layer)
↓
Services (Business Logic)
↓
Repository Layer (SQLite Queries)
↓
Database (expo-sqlite)

---

## 📂 Project Structure

app/ # Expo Router (navigation)
src/
├── components/ # Reusable UI components
├── store/ # Redux Toolkit store & slices
├── database/ # SQLite setup and queries
├── services/ # Business logic layer
├── hooks/ # Custom hooks
├── utils/ # Helpers & validators
├── types/ # TypeScript types

---

## 🗄️ Data Model

### Lists Table

| Column   | Type    | Description          |
| -------- | ------- | -------------------- |
| id       | INTEGER | Primary key          |
| name     | TEXT    | List name (required) |
| priority | TEXT    | High / Medium / Low  |
| color    | TEXT    | Optional             |

---

### Items Table

| Column    | Type    | Description          |
| --------- | ------- | -------------------- |
| id        | INTEGER | Primary key          |
| listId    | INTEGER | Foreign key (List)   |
| name      | TEXT    | Item name (required) |
| quantity  | TEXT    | Optional             |
| notes     | TEXT    | Optional             |
| completed | INTEGER | 0 = false, 1 = true  |

---

## ⚙️ Setup & Run

### 1. Install dependencies

```bash
npm install
```
