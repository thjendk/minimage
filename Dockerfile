FROM node:15.7.0
WORKDIR /usr/src/app
# Dont skip this step. It is for caching.
COPY package*.json ./ 
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]