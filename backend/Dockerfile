# Start from a Go image
FROM golang:1.24.3-alpine

# Setup Work Directory
WORKDIR /app

# Copy Go modules and install dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o golangexternalweb .

# Expose the port your app will run on
EXPOSE ${PORT}

ENV SMTP_HOST=10.145.0.250
ENV SMTP_USERNAME=it-system@prospira-th.com
ENV SMTP_PASSWORD=Psth@min135
ENV SMTP_PORT=25
ENV SMTP_SET_FROM=test-service@prospira.com

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=Prospira@2025!
ENV POSTGRES_DB=prospira-website
ENV POSTGRES_HOST=10.144.1.104
ENV POSTGRES_PORT=5432

ENV SQLSERVER_USER=external-web
ENV SQLSERVER_PASSWORD=kwpHIJ!uH.b;ermY
ENV SQLSERVER_DB=DB_EXTERNAL_WEB
ENV SQLSERVER_HOST=10.144.1.101
ENV SQLSERVER_PORT=1433


ENV SERVER_PORT=7777
ENV TOKEN_SECRET_KEY=1844cb55cd2b085135a1297c87196e46337b191710c96eadf2a2897e2b1cb8ce
ENV SENDGRID_API_KEY=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


# Run the application
CMD ["./golangexternalweb"]