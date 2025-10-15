# 🚀 Quick Start Guide

Get your Next.js portfolio up and running in 5 minutes!

## ⚡ Fastest Path to Running

### Option 1: Development Mode (Recommended for testing)

```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Create environment file
echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql" > .env.local

# 3. Start frontend (opens on http://localhost:3000)
npm run dev
```

**Note**: The backend won't be running, so the contact form won't work, but you can see the entire site.

### Option 2: Full Stack (Frontend + Backend)

```bash
# Terminal 1 - Backend
cd backend/service
npm install
cp .env.example .env  # Edit with your email settings
npm start

# Terminal 2 - Frontend  
cd frontend
npm install
echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql" > .env.local
npm run dev
```

Visit: http://localhost:3000

### Option 3: Docker (Everything)

```bash
# From project root
./deploy.sh
```

Visit: http://localhost (port 80)

---

## 📋 What You Need

### Minimum Requirements
- Node.js 18 or higher
- npm (comes with Node.js)

### Optional (for email functionality)
- SMTP email account (Gmail works)
- App-specific password for Gmail

---

## 🔑 Environment Setup

### Frontend Only
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### Full Stack
Additionally, create `backend/service/.env`:
```env
NODE_ENV=development
PORT=4000

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=your_email@gmail.com

CORS_ORIGIN=http://localhost:3000
```

---

## 🎯 Commands Cheat Sheet

### Frontend
```bash
cd frontend

npm run dev      # Development server (port 3000)
npm run build    # Production build
npm start        # Run production build
npm run lint     # Check for errors
```

### Backend
```bash
cd backend/service

npm run dev      # Development with auto-reload
npm start        # Production server
npm run build    # Compile TypeScript
```

### Docker
```bash
./deploy.sh              # Complete deployment
./start.sh start         # Start services
./start.sh stop          # Stop services
./start.sh logs          # View logs
docker compose down      # Stop everything
```

---

## ✅ Verify It's Working

### Frontend Working
- Navigate to http://localhost:3000
- You should see the portfolio home page
- Navigation should work (Home, About, Projects, Contact)

### Backend Working
- Navigate to http://localhost:4000/graphql
- You should see GraphQL Playground
- Try a simple query

### Contact Form Working
- Go to Contact page
- Fill out form and submit
- Check backend logs for submission
- Check email inbox for confirmation

---

## 🐛 Common Issues

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "GraphQL connection error"
- Make sure backend is running on port 4000
- Check `NEXT_PUBLIC_GRAPHQL_URL` in `.env.local`
- Verify CORS settings allow `http://localhost:3000`

### "Email not sending"
- Check SMTP credentials in backend `.env`
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
- Verify `SMTP_HOST` and `SMTP_PORT` are correct

---

## 🎨 First Time Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Cloned repository
- [ ] Frontend dependencies installed
- [ ] Frontend `.env.local` created
- [ ] Frontend running on port 3000
- [ ] Backend dependencies installed (optional)
- [ ] Backend `.env` configured (optional)
- [ ] Backend running on port 4000 (optional)
- [ ] All pages loading correctly
- [ ] Contact form working (if backend running)

---

## 📖 Next Steps

Once everything is running:

1. **Customize Content**
   - Edit `src/components/Home/Home.jsx` for your info
   - Update `src/components/About/About.jsx` with your experience
   - Modify contact email in `src/components/Contact/Contact.jsx`

2. **Add Your Images**
   - Replace `src/assets/ProfessionalHeadShot.jfif`
   - Update social media icons if needed

3. **Test Everything**
   - Check all pages load
   - Test navigation
   - Submit contact form
   - Verify email delivery

4. **Deploy**
   - See [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) for deployment options
   - Consider Vercel for easiest Next.js deployment

---

## 🆘 Need Help?

- **Full Documentation**: See [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)
- **Next.js Docs**: https://nextjs.org/docs
- **Apollo Docs**: https://www.apollographql.com/docs/react
- **Issues**: Open an issue on GitHub

---

**Ready to build? Start with Option 1 above! 🚀**


