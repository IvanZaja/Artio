FROM node:20.11.1 as builder

ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY $VITE_GOOGLE_API_KEY
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL $VITE_API_BASE_URL

COPY ./web /opt/artio-web
WORKDIR /opt/artio-web
RUN npm ci
RUN npm run build

FROM node:20.11.1-alpine3.19

COPY ./api /opt/artio-api
WORKDIR /opt/artio-api
COPY --from=builder /opt/artio-web/dist /opt/artio-api/web/build
RUN npm ci --omit=dev


EXPOSE 3000
CMD ["npm", "start"]