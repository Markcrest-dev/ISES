# Deployment Guide for ISES

## Frontend Deployment (Vercel)

### Prerequisites
- A Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Configure Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add:
     - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api` (update after backend deployment)
     - `CI` = `false`

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend

### Configuration Files
- `frontend/vercel.json` - Vercel configuration (already created)
- `frontend/.env.production` - Production environment variables (update REACT_APP_API_URL)

---

## Backend Deployment (Render)

### Prerequisites
- A Render account
- A MySQL database (Aiven, PlanetScale, or Render MySQL)

### Steps

1. **Prepare Database**
   - If using Aiven MySQL, get your connection details from the Aiven console
   - Make sure the database is accessible from the internet
   - Note down: host, port, database name, username, password

2. **Deploy to Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: ises-backend
     - **Root Directory**: `backend`
     - **Environment**: PHP
     - **Build Command**:
       ```bash
       composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan route:cache && php artisan view:cache
       ```
     - **Start Command**:
       ```bash
       php artisan serve --host=0.0.0.0 --port=$PORT
       ```

3. **Set Environment Variables in Render**
   Go to Environment and add:
   ```
   APP_NAME=ISES
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=<generate using: php artisan key:generate --show>
   APP_URL=https://your-backend-url.onrender.com

   DB_CONNECTION=mysql
   DB_HOST=<your-aiven-host>
   DB_PORT=23241
   DB_DATABASE=cosmicForge
   DB_USERNAME=avnadmin
   DB_PASSWORD=<your-aiven-password>

   FRONTEND_URL=https://your-frontend-url.vercel.app

   LOG_CHANNEL=stack
   LOG_LEVEL=error
   SESSION_DRIVER=file
   QUEUE_CONNECTION=sync
   ```

4. **Run Migrations**
   After deployment, go to Render Shell and run:
   ```bash
   php artisan migrate --force
   ```

5. **Update Frontend Environment Variable**
   - Copy your Render backend URL (e.g., `https://ises-backend.onrender.com`)
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Update `REACT_APP_API_URL` to `https://ises-backend.onrender.com/api`
   - Redeploy frontend

---

## Database Configuration

### Option 1: Aiven MySQL (Current)
Update these in Render environment variables:
```
DB_HOST=mysql-25e81406-chiderastanley272-ded0.c.aivencloud.com
DB_PORT=23241
DB_DATABASE=cosmicForge
DB_USERNAME=avnadmin
DB_PASSWORD=<your-password>
```

### Option 2: Render PostgreSQL
1. Create a PostgreSQL database on Render
2. Update environment variables:
```
DB_CONNECTION=pgsql
DB_HOST=<from-render>
DB_PORT=5432
DB_DATABASE=<from-render>
DB_USERNAME=<from-render>
DB_PASSWORD=<from-render>
```

---

## Troubleshooting

### Frontend Build Fails
- **Issue**: Build warnings treated as errors
- **Solution**: `CI=false` is set in `vercel.json` and build script

### Backend Database Connection Fails
- **Issue**: Cannot resolve Aiven hostname
- **Solution**:
  - Check internet connectivity
  - Verify Aiven service is running
  - Check firewall settings
  - Use local MySQL for development

### CORS Errors
- **Issue**: Frontend can't access backend API
- **Solution**: Update `FRONTEND_URL` in backend environment variables

### 404 on Frontend Routes
- **Issue**: Direct URL access returns 404
- **Solution**: `vercel.json` includes rewrite rules (already configured)

---

## Post-Deployment

1. **Test the application**
   - Visit your Vercel URL
   - Try to register/login
   - Test all features

2. **Monitor logs**
   - Vercel: Check function logs
   - Render: Check service logs

3. **Set up custom domains** (optional)
   - Configure custom domain in Vercel
   - Configure custom domain in Render
   - Update environment variables accordingly

---

## Configuration Files Created

### Frontend
- `frontend/vercel.json` - Vercel configuration
- `frontend/.env.production` - Production environment variables

### Backend
- `backend/Procfile` - Process file for deployment
- `backend/render.yaml` - Render configuration (optional)
- `backend/.env.production` - Production environment template

---

## Important Notes

1. **Never commit `.env` files** with sensitive data to GitHub
2. **Always use environment variables** for sensitive configuration
3. **Run migrations** after first deployment
4. **Update CORS settings** in `config/cors.php` if needed
5. **Monitor database connection limits** on Aiven free tier
