# Jetly Frontend

Jetly is a **Bitly-inspired URL shortener**.
This repository contains the **frontend application** built with **React** and **React Router**, providing an intuitive UI for managing shortened URLs.

The frontend is hosted on **Netlify** and communicates with the [Jetly Backend](https://github.com/joshualungido/url-shortener-be).

---

## 🌍 Subdomain-Based Architecture

Jetly separates the main dashboard and redirection service using **different subdomains** for cleaner routing and scalability.

### Structure

| Subdomain              | Purpose                                       | Example                          |
| ---------------------- | --------------------------------------------- | -------------------------------- |
| **[www](http://www).** | Frontend web app (dashboard, analytics, auth) | `https://www.jetly.app`          |
| **url.**               | Redirection service (handles short links)     | `https://url.jetly.app/PhKP0D31` |

### How It Works

When a user visits a short link like

```
https://url.jetly.app/PhKP0D31
```

the request is sent to the backend, which:

1. Looks up the original URL from the database using the short code (`PhKP0D31`).
2. Responds with an HTTP **302 Redirect** to the destination (e.g., `https://google.com`).

Spring Boot handles this automatically via:

```java
@GetMapping("/{shortUrl}")
public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {
    var url = urlMappingService.getOriginalUrl(shortUrl);
    if (url != null) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", url.getOriginalUrl());
        return ResponseEntity.status(302).headers(headers).build();
    }
    return ResponseEntity.notFound().build();
}
```

### Why Use Subdomains?

✅ **Separation of concerns** –
Different subdomains for redirection and the main dashboard prevent routing conflicts between React and Spring Boot.

✅ **Professional structure** –
Matches industry-standard designs (like `bit.ly`), where the redirect and main site are distinct.

✅ **Scalability & analytics** –
You can apply different rate limits, tracking, and even host the redirect service independently for better performance.

✅ **Security & flexibility** –
Simpler SSL setup and easier to control which subdomain serves public traffic versus internal APIs.

---

## 🚀 Live Demo

Try Jetly here:
👉 [https://jetlys.netlify.app/](https://jetlys.netlify.app/)

---

## ✨ Features

* 🌐 **URL Shortening** – easily shorten long URLs
* 📊 **Analytics Dashboard** – view total clicks and usage stats
* 🔐 **Authentication** – login and register via JWT-secured backend
* 🖼️ **Modern UI** – responsive design built with React and Tailwind CSS

---

## 🧠 Tech Stack

* **React 18**
* **React Router v6**
* **Axios** (for API communication)
* **Tailwind CSS** (styling)
* **Netlify** (deployment)

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js 18+
* npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/jetly-frontend.git
cd jetly-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
echo "REACT_APP_API_BASE_URL=https://your-backend-url.com" > .env

# 4. Run development server
npm start
```

Frontend runs locally at

```
http://localhost:5173
```

---

## ☁️ Deployment

* **Frontend:** Netlify
* **Backend:** Spring Boot (e.g., deployed on Render or Back4App)
* **Database:** NeonDB (PostgreSQL)

---

## 🪪 License

This project is licensed under the **MIT License**.

---

Would you like me to make a **matching section** for your **backend README** too (explaining how the redirect controller and subdomain mapping work from the backend perspective)?
It’ll make both repos consistent and easy for others to understand the full architecture.
