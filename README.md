# Jetly Frontend

Jetly is a Bitly-inspired URL shortener.
This repository contains the **frontend application** built with **React** and **React Router**, providing an intuitive UI for managing shortened URLs.

The frontend is hosted on **Netlify** and communicates with the [Jetly Backend](https://github.com/yourusername/jetly-backend).

---

## Live Demo

🚀 Try it out here: [https://jetlys.netlify.app/](https://jetlys.netlify.app/)

---

## Features

* 🌐 **URL Shortening** – easily shorten long URLs
* 📊 **Analytics** – view total clicks and usage stats
* 🔐 **Authentication** – login and register via JWT-secured backend
* 🖼️ **Modern UI** – responsive design built with React

---

## Tech Stack

* **React 18**
* **React Router**
* **Axios** (for API calls)
* **Tailwind CSS / Custom Styling** (depending on your setup)
* **Netlify** for deployment

---

## Setup & Installation

### Prerequisites

* Node.js 18+
* npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/jetly-frontend.git
   cd jetly-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables in `.env`:

   ```env
   REACT_APP_API_BASE_URL=https://your-backend-url.com
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. The frontend will be available at:

   ```
   http://localhost:3000
   ```

---

## Deployment

The frontend is hosted on **Netlify** and connected to the backend running on **Back4App** with a **Neon DB** database.

---



## License

This project is licensed under the MIT License.
