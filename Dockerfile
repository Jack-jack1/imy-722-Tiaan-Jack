# Use a small nginx image to serve the static calculator files
FROM nginx:stable-alpine

# Set working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy application files into the nginx document root
COPY index.html css js .

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
