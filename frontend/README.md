# Portfolio Frontend - Next.js

This is the frontend for Evan Patrick's portfolio website, built with Next.js 14 and Apollo GraphQL.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: CSS3 (component-scoped)
- **GraphQL Client**: Apollo Client
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
frontend/
├── public/              # Static assets
│   └── vite.svg        # Favicon and public images
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── layout.jsx  # Root layout with Apollo Provider
│   │   ├── page.jsx    # Home page
│   │   └── globals.css # Global styles
│   ├── components/     # React components
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Home/
│   │   ├── NavBar/
│   │   └── Projects/
│   ├── lib/            # Utilities
│   │   ├── apollo-wrapper.jsx  # Apollo Client setup
│   │   └── graphql/
│   │       └── mutations.js    # GraphQL mutations
│   └── assets/         # Images and static assets
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript config (for IDE support)
```

## Features

- **Single Page Application**: Smooth navigation without page reloads
- **GraphQL Integration**: Contact form powered by GraphQL mutations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern dark color scheme
- **Project Showcase**: Interactive widgets for various projects
- **Professional Profile**: About, skills, and experience sections

## Components

### Main Sections
- **Home**: Landing page with profile information
- **About**: Skills, experience, and background
- **Projects**: Interactive project widgets
- **Contact**: Contact form with GraphQL backend

### Project Widgets
- Calculator
- Pixel Sketch (Etch-a-Sketch)
- Rock Paper Scissors
- Tic Tac Toe
- Library Manager
- Todo List

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL API endpoint | `http://localhost:4000/graphql` |

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy!

### Docker

See the main `Dockerfile` and `docker-compose.yml` in the root directory.

## GraphQL Backend

This frontend connects to a GraphQL backend. Make sure the backend service is running:

```bash
cd ../backend/service
npm install
npm start
```

The backend runs on `http://localhost:4000` by default.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use!

## License

See LICENSE file in the root directory.

## Contact

- **Email**: EvanPatrick3@protonmail.com
- **GitHub**: [@EvanPatrick423](https://github.com/EvanPatrick423)
- **LinkedIn**: [Evan Patrick](https://linkedin.com/in/evan-patrick-4824481b1/)

---

**Note**: This project was migrated from Vite to Next.js. See `NEXT_MIGRATION.md` for details about the migration.
