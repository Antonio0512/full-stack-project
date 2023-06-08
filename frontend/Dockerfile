# Frontend Dockerfile
FROM node:14

WORKDIR /app

# Install frontend dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --silent

# Build the frontend app
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
