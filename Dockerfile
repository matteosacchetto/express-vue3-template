# Select the nodejs 14 LTS version
FROM node:14

# Upgrade npm to the latest version
RUN npm i -g npm

# Create app directory
WORKDIR /usr/src/app

# Install server dependencies
WORKDIR /usr/src/app/server
COPY ./server/package*.json ./
RUN npm ci --no-optional --production

# Install client dependencies
WORKDIR /usr/src/app/client
COPY ./client/package*.json ./
RUN npm ci

# Bundle app source
WORKDIR /usr/src/app
COPY . .

# Build client
WORKDIR /usr/src/app/client
RUN npm run build

# Define ENV variables
ENV NODE_ENV=production
ENV USE_HTTP=true
ENV PORT=80
ENV USE_HTTPS=true
ENV PORT_HTTPS=443
ENV SSL_KEY_PATH=ssl/ssl.key
ENV SSL_CERT_PATH=ssl/ssl.cert
ENV USE_STATIC=true
ENV USE_STDOUT=true

# Expose app default port
EXPOSE 80
EXPOSE 443

# Start the application
WORKDIR /usr/src/app/server
CMD ["node", "."]