# Next.js Migration Guide

This portfolio has been migrated from React + Vite to Next.js 14.

## What Changed

### Framework
- **Before**: React with Vite
- **After**: Next.js 14 with App Router

### Key Changes

1. **Project Structure**
   - Moved to Next.js App Router structure
   - Main page is now in `src/app/page.jsx`
   - Layout component in `src/app/layout.jsx`
   - Components remain in `src/components/`

2. **Apollo Client Setup**
   - Apollo Provider now wrapped in a client component (`src/lib/apollo-wrapper.jsx`)
   - GraphQL queries moved to `src/lib/graphql/`

3. **Image Optimization**
   - Using Next.js `Image` component for optimized images
   - Assets remain in `src/assets/`
   - Public assets in `public/`

4. **Client Components**
   - Added `'use client'` directive to interactive components
   - All components that use hooks or state are client components

## Environment Variables

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

For production, update this to your production GraphQL endpoint.

## Running the Application

### Development
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Docker Deployment

The Dockerfile and docker-compose.yml may need updates to work with Next.js:

### Updated Dockerfile (frontend section)
```dockerfile
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS frontend-runner
WORKDIR /app
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/package*.json ./
COPY --from=frontend-builder /app/frontend/next.config.js ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

## Dependencies

Main dependencies added/changed:
- `next` - Next.js framework
- React downgraded to 18.x (Next.js 14 compatibility)
- Removed `vite` and Vite plugins
- Added Next.js ESLint config

## GraphQL Configuration

GraphQL endpoint can be configured via environment variable:
- Development: `http://localhost:4000/graphql`
- Production: Set `NEXT_PUBLIC_GRAPHQL_URL` in your hosting environment

## Deployment Notes

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_GRAPHQL_URL`
3. Deploy!

### Other Platforms
Make sure to:
1. Set the build command to `npm run build`
2. Set the start command to `npm start`
3. Configure environment variables
4. Ensure Node.js 18+ is available

## Features Preserved

All original features remain functional:
- ✅ Navigation between pages
- ✅ Apollo GraphQL integration
- ✅ Contact form with GraphQL mutation
- ✅ All project widgets (Calculator, Etch-a-Sketch, etc.)
- ✅ Responsive design
- ✅ All styling and animations

## Benefits of Next.js

1. **Better Performance**: Automatic code splitting and optimization
2. **SEO**: Better support for search engines with server-side rendering
3. **Image Optimization**: Automatic image optimization and lazy loading
4. **Built-in Routing**: No need for react-router-dom
5. **Production Ready**: Better production builds and optimizations
6. **API Routes**: Can add backend API routes in the same project (optional)

## Troubleshooting

### Issue: Module not found errors
- Make sure you've run `npm install`
- Check that all imports use the correct paths

### Issue: Images not loading
- Ensure images are in `src/assets/` or `public/`
- Use Next.js `Image` component for optimized images

### Issue: GraphQL not connecting
- Check that the backend is running
- Verify `NEXT_PUBLIC_GRAPHQL_URL` is set correctly
- Check browser console for errors

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js + Apollo Client](https://www.apollographql.com/docs/react/integrations/next-js)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

