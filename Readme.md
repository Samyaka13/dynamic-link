# Plunge - Dynamic Link Backend

**Plunge** is a Node.js backend application that serves as a dynamic link shortener and click tracker. It captures valuable information about users clicking a link—such as IP address, location, device type, operating system, and more—and redirects them to the appropriate destination (e.g., an app store link or a fallback URL). The application also provides RESTful APIs to retrieve the collected click data.

🔗 **Deployed Link**: [https://plunge-assignment.onrender.com/](https://plunge-assignment.onrender.com/)

---

## 🚀 Features

- **Dynamic Redirection**  
  Redirects users to appropriate URLs based on their operating system (Android/iOS) or to a fallback URL.

- **Click Tracking**  
  Captures the following data on each click:

  - Timestamp
  - IP Address
  - Approximate City & Region (via [ipapi.co](https://ipapi.co/))
  - Device Type (Desktop, Mobile, Tablet)
  - Operating System
  - Device Vendor
  - Referrer URL
  - Redirect Destination URL

- **Persistent Data Storage**  
  Uses MongoDB to persist all click-related data.

- **User Agent Analysis**  
  Parses user agent strings using `ua-parser-js` to determine OS and device information.

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **User Agent Parsing:** `ua-parser-js`
- **GeoIP Service:** [ipapi.co](https://ipapi.co/) via `axios`
- **Environment Management:** `dotenv`
- **CORS Handling:** `cors`
- **Development Tools:** `nodemon`

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud-hosted like MongoDB Atlas)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd plunge
npm install
# or
# yarn install
```

### 2. Configure Environment Variables

#### MongoDB Configuration

MONGODB_URI="your_mongodb_connection_string_here"

##### Server Configuration

PORT=8000
CORS_ORIGIN="\*"

### 3. Start the Development Server

npm run dev
