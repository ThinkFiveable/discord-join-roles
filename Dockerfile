FROM node:14-alpine
LABEL name "Discord AutoRoler"
LABEL version "1.0.0"

WORKDIR /usr/vh

COPY tsconfig.json package.json package-lock.json ./
RUN npm i

COPY src/ src/
RUN npm run build

CMD [ "node", "dist/index.js" ]
