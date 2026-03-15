# Stage 1: Build Angular app
FROM node:20-alpine AS build

RUN npm config set registry https://registry.npmjs.org/
RUN npm config set strict-ssl true

WORKDIR /app


# Debug: Show environment
RUN echo "=== Environment Debug ===" && node --version && npm --version
RUN echo "=== NPM Configuration (should show public registry) ===" && npm config list
RUN echo "=== Confirm Registry ===" && npm config get registry

# Install Angular CLI globally first to avoid npx downloads
RUN npm install -g @angular/cli@latest

# Step1 fetch and install dependencies ( Layer caching optimization )
COPY package*.json ./
RUN npm install --force

# Debug: Check if Angular CLI was installed
RUN echo "=== Checking Global Angular CLI ===" && ng version || echo "Global ng failed"
RUN echo "=== Checking Local Angular CLI ===" && ls -la node_modules/.bin/ | grep ng || echo "Local Angular CLI not found"

# Step 2 : copy over project files and build
COPY . .

# Debug: Show project files and Angular configuration
RUN echo "=== Project Files ===" && ls -la
RUN echo "=== Angular.json Check ===" && cat angular.json || echo "angular.json not found"
RUN echo "=== Package.json Scripts ===" && cat package.json | grep -A 10 '"scripts"' || echo "No scripts found"

# Build Angular app with globally installed CLI
# Disable font optimization to avoid SSL certificate issues during build
RUN echo "=== Starting Angular Build ===" && \
    ng build --configuration production --verbose 2>&1 | tee /tmp/build.log || \
    (echo "=== ANGULAR BUILD FAILED - Error Details ===" && \
     cat /tmp/build.log && \
     echo "=== Node Modules Check ===" && \
     ls -la node_modules/@angular/ || echo "Angular packages missing" && \
     echo "=== Angular CLI Check ===" && \
     ng version || echo "Angular CLI check failed" && \
     exit 1)

RUN ls dist

# Add build info if build args are provided
RUN if [ ! -z "$version" ] && [ ! -z "$timestamp" ]; then \
    echo "{ \"timestamp\": \"$timestamp\", \"version\": \"$version\", \"srcBranch\": \"$srcBranch\", \"srcCommit\": \"$srcCommit\" }" > ./dist/frontend/browser/assets/build-info.json; \
    fi

# Stage 2: Nginx serve
FROM nginx:1.27-alpine-slim AS final

# Create nginx cache directories with proper permissions
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R 755 /var/cache/nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built angular dist with proper permissions
COPY --from=build --chown=nginx:nginx /app/dist/frontend/browser /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start nginx (keep as root to handle permissions properly)
CMD ["nginx", "-g", "daemon off;"]
