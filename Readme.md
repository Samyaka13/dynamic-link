# Plunge - Dynamic Link Backend

Plunge is a Node.js backend application designed to act as a dynamic link shortener and tracker. It captures information about users clicking a link, such as their IP address, approximate location, device type, and operating system, and then redirects them to a pre-configured destination URL (e.g., an app store page or a fallback website). It also provides API endpoints to retrieve the collected click data.

## Features

*   **Dynamic Redirection:** Redirects users based on their operating system (Android, iOS) to respective app stores or a fallback URL.
*   **Click Tracking:** Logs details for each click:
    *   Timestamp
    *   IP Address
    *   Approximate City & Region (via [ipapi.co](https://ipapi.co/))
    *   Device Type (desktop, mobile, tablet)
    *   Operating System
    *   Device Vendor
    *   Referrer URL
    *   Redirected-to URL
*   **Data Storage:** Uses MongoDB to store click data.
*   **User Agent Parsing:** Uses `ua-parser-js` to extract device and OS information.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose ODM
*   **User Agent Parsing:** `ua-parser-js`
*   **HTTP Client (for GeoIP):** `axios`
*   **Environment Variables:** `dotenv`
*   **CORS:** `cors`
*   **Development:** `nodemon`

## Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended, due to ES Modules usage)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [MongoDB](https://www.mongodb.com/try/download/community) instance (local or cloud-hosted like MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd plunge
npm install
# or
# yarn install
# .env
```
# ENV Files

## MongoDB Configuration
MONGODB_URI="your_mongodb_connection_string_here" 
DB_NAME="plunge"

## Server Configuration
PORT=8000
CORS_ORIGIN="*"

# Start the server
npm run dev

