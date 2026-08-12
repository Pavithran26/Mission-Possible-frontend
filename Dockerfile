# Build stage: needs devDependencies (vite, esbuild, tailwind, typescript).
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Produces dist/ (client bundle) and dist/server.cjs (the BFF server).
RUN npm run build

# Runtime stage: production dependencies only.
FROM node:24-alpine AS final
WORKDIR /app

# Serves the built client from dist/ instead of starting Vite in middleware mode.
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

# server.cjs is bundled with --packages=external, so it resolves express,
# http-proxy-middleware, @google/genai and vite from node_modules at run time.
# It reads PORT itself and binds 0.0.0.0, so no shell expansion is needed here.
CMD ["node", "dist/server.cjs"]
