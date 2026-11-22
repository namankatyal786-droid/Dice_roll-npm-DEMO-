# Dice Roller Demo

A full-stack demo application showcasing the published npm package [`naman-dice`](https://www.npmjs.com/package/naman-dice) ([GitHub Repository](https://github.com/namankatyal786-droid/My-First-Npm-package)).

## Live Links

- **Live Demo:** [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app) *(Placeholder)*
- **API Health Check:** [https://your-backend-url.onrender.com/api/health](https://your-backend-url.onrender.com/api/health) *(Placeholder)*

---

## Local Development

To run the project locally, you will need two separate terminal windows.

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:5001`.

### 2. Start the Frontend Client

```bash
cd client
npm install
npm run dev
```
The Vite development server will typically start at `http://localhost:5173`.

---

## Deployment Notes

### Backend on Render
- **Root Directory:** `server`
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- By default Render supplies a `PORT` environment variable which the server automatically binds to.

### Frontend on Vercel
- **Root Directory:** `client`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:**
  - `VITE_API_URL`: Your backend URL on Render (e.g., `https://your-backend-url.onrender.com`, without trailing slash).
