# Evan Patrick's Portfolio

A full-stack portfolio website built with Next.js and GraphQL, showcasing projects, skills, and professional experience.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: CSS3 (component-scoped)
- **GraphQL Client**: Apollo Client
- **Image Optimization**: Next.js Image component

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **API**: GraphQL (Apollo Server)
- **Language**: TypeScript
- **Email**: Nodemailer (SMTP)

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (reverse proxy)
- **Process Manager**: PM2
- **Deployment**: Docker-based multi-service architecture

## 📁 Project Structure

```
Portfolio/
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   ├── lib/           # Apollo Client & utilities
│   │   └── assets/        # Images and static files
│   ├── public/            # Public static files
│   └── package.json
├── backend/
│   └── service/           # GraphQL backend
│       ├── src/
│       │   ├── graphql/   # GraphQL schemas
│       │   ├── resolvers/ # GraphQL resolvers
│       │   └── services/  # Business logic
│       └── package.json
├── docker-compose.yml     # Multi-service orchestration
├── Dockerfile             # Multi-stage build
├── nginx.conf             # Nginx configuration
├── ecosystem.config.js    # PM2 configuration
└── deploy.sh              # Deployment script
```

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend/service
   npm install
   
   # Frontend
   cd ../../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend: Create .env.local
   cd frontend
   echo "NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql" > .env.local
   
   # Backend: Create .env (see backend/service/.env.example)
   cd ../backend/service
   cp .env.example .env
   # Edit .env with your SMTP settings
   ```

4. **Run development servers**
   ```bash
   # Terminal 1: Backend
   cd backend/service
   npm run dev
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - GraphQL API: http://localhost:4000/graphql

## 🐳 Docker Deployment

### Quick Deploy
```bash
./deploy.sh
```

This automated script will:
- Verify Docker installation
- Create .env template if needed
- Build and start all services
- Display service URLs and logs

### Manual Docker Commands
```bash
# Build and start
docker compose up --build -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Using start.sh Helper
```bash
./start.sh build    # Build images
./start.sh start    # Start services
./start.sh logs     # View logs
./start.sh stop     # Stop services
./start.sh status   # Check status
./start.sh clean    # Clean up
```

## 🌐 Deployment URLs (Docker)

When deployed with Docker:
- **Main Site**: http://localhost (nginx on port 80)
- **GraphQL API**: http://localhost/graphql (proxied)
- **Direct Frontend**: http://localhost:3000
- **Direct Backend**: http://localhost:4000/graphql

## 📦 Production Build

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend/service
npm run build
npm start
```

### With PM2
```bash
# Install PM2 globally
npm install -g pm2

# Start both services
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Logs
pm2 logs
```

## 🎨 Features

### Main Sections
- **Home**: Landing page with profile and social links
- **About**: Professional experience, skills, and background
- **Projects**: Interactive project showcase with embedded widgets
- **Contact**: Working contact form with GraphQL backend

### Project Widgets
- Calculator
- Pixel Sketch (Etch-a-Sketch)
- Rock Paper Scissors Game
- Tic Tac Toe
- Library Manager
- Todo List

### Technical Features
- ✨ Fully responsive design
- 🎨 Modern dark theme
- ⚡ Optimized performance
- 📱 Mobile-friendly
- 🔍 SEO-optimized (Next.js)
- 📧 Working contact form with email notifications
- 🔒 CORS-protected API

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

#### Backend (.env)
```env
NODE_ENV=production
PORT=4000

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=your_contact_email@gmail.com

# Security
CORS_ORIGIN=http://localhost:3000
```

#### Docker (.env in root)
```env
NODE_ENV=production
BACKEND_PORT=4000
FRONTEND_PORT=3000
NGINX_PORT=80
NEXT_PUBLIC_GRAPHQL_URL=http://localhost/graphql
# ... other variables
```

## 📚 Documentation

- **Migration Guide**: [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)
- **Frontend README**: [frontend/README.md](./frontend/README.md)
- **Backend README**: [backend/service/README.md](./backend/service/README.md)
- **Next.js Migration Details**: [frontend/NEXT_MIGRATION.md](./frontend/NEXT_MIGRATION.md)

## 🔄 Recent Updates

**October 2025**: Migrated from Vite to Next.js 14
- Improved performance and SEO
- Better image optimization
- Enhanced developer experience
- Production-ready architecture

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## 📄 License

See [LICENSE](./LICENSE) file for details.

## 📧 Contact

- **Email**: EvanPatrick3@protonmail.com
- **GitHub**: [@EvanPatrick423](https://github.com/EvanPatrick423)
- **LinkedIn**: [Evan Patrick](https://linkedin.com/in/evan-patrick-4824481b1/)
- **Portfolio**: [Live Site](https://your-domain.com)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with vanilla CSS
- GraphQL powered by [Apollo](https://www.apollographql.com/)
- Icons and images from various open sources

---

**Made with ❤️ by Evan Patrick**


