# Этап 1 - сборка бэкенда
FROM golang:1.23 AS backend
WORKDIR /opt/app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY ./backend .
RUN CGO_ENABLED=0 GOOS=linux go build -o ./main ./cmd/main.go

# Этап 2 - сборка фронтенда
FROM node:19-alpine AS frontend
WORKDIR /opt/app
COPY ./frontend .
RUN npm i
RUN npm run build

# Этап 3 - итоговая сборка
FROM alpine:latest
WORKDIR /opt/app
COPY --from=backend /opt/app/main .
COPY --from=frontend /opt/app/dist .
EXPOSE 5000

CMD ["./main"]