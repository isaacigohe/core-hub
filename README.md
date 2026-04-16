#  CORE-HUB

A premium movie tracking platform that allows cinema enthusiasts to organize and manage their personal film collections.

##  Overview

CORE-HUB is designed for those who want a **sophisticated digital library** for their movie-watching journey. Instead of simple lists, users interact with a high-end interface to track what they’ve seen, what they’re currently watching, and what’s next on their list.

The platform focuses on a **premium aesthetic**, utilizing glassmorphism and gold accents to create a professional "cinema-hub" feel.

---

##  Features

### **Authentication**
* Secure user signup and login using **Firebase Authentication**.
* Persistent sessions (stay logged in even after refreshing).

### **Watchlist Management (CRUD)**
* Users can:
    * Add movies from the TMDB database.
    * Track movie status: `Want to Watch`, `Watching`, or `Watched`.
    * Rate movies (1-10 stars).
    * Edit or remove movies from their collection.
* All data is synced in real-time via **Firestore**.

### **Movie Discovery**
* Real-time search functionality integrated with **The Movie Database (TMDB) API**.
* View movie posters, ratings, and release details before adding them to your hub.

### **Premium Dashboard**
* Visual overview of your entire collection.
* Quick-filter system to toggle between different watch statuses.
* Responsive grid layout optimized for all screen sizes.

### **UI/UX Styling**
* **Glassmorphism:** Frosted-glass components for a modern depth effect.
* **Cinema Lighting:** Custom gold/amber background glows for a high-end feel.
* **Tailwind Optimized:** Smooth transitions and hover effects on every card.

---

##  Tech Stack

### **Frontend**
* React (Vite)
* Tailwind CSS
* Shadcn UI (Components)

### **Backend / BaaS**
* Firebase Authentication
* Cloud Firestore

### **API**
* TMDB API (The Movie Database)

---

##  Running the Project Locally

Follow these steps to set up and run the project on your local machine.

### **Prerequisites**
* Node.js (v18 or higher)
* npm
* Git

### **1. Clone the Repository**
```bash
git clone [https://github.com/your-username/core-hub.git](https://github.com/your-username/core-hub.git)
cd core-hub


# Core-Hub

A movie watchlist application built with React, Firebase, and TMDB API.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_token
```

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "Core-Hub"
3. Enable Authentication (Email/Password)
4. Enable Firestore Database

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Test the Flow

* Create a new account
* Go to Search and add a movie to your watchlist
* Change the status to Watched on your Dashboard
* Try the Logout button in the Navbar

##  Common Issues

### 1. 400 Error during Sign Up

* Ensure Email/Password is enabled in the Firebase Auth settings
* Check that your password is at least 6 characters long

### 2. Images not loading

* Ensure your `VITE_TMDB_READ_ACCESS_TOKEN` is valid and hasn't expired

### 3. Navbar looks weird

* Make sure you have the `glass` and `text-gradient` utility classes defined in your `index.css`