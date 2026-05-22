# Event Ledger System

A distributed event-driven financial ledger system built using Node.js microservices.

---

# Architecture Overview

The system consists of two independently deployable microservices:

## 1. Gateway Service

Public-facing API responsible for:

- Event ingestion
- Validation
- Idempotency enforcement
- Event persistence
- Distributed tracing
- Calling Account Service

### Endpoints

| Method | Endpoint |
|---|---|
| POST | /events |
| GET | /events/:id |
| GET | /events?account=... |
| GET | /health |
| GET | /metrics |

---

## 2. Account Service

Internal service responsible for:

- Account balances
- Transaction history
- Financial ledger calculations

### Endpoints

| Method | Endpoint |
|---|---|
| POST | /accounts/:accountId/transactions |
| GET | /accounts/:accountId/balance |
| GET | /accounts/:accountId |
| GET | /health |
| GET | /metrics |

---

# Architecture Diagram

Client
↓
Gateway Service
↓
Account Service

---

# Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Axios
- Jest
- Supertest
- Docker Compose
- Pino Logging
- Prometheus Metrics

---

# Key Features

## Idempotency

Duplicate event submissions are prevented using unique event IDs.

---

## Out-of-Order Event Handling

Events are always retrieved chronologically using event timestamps.

---

## Distributed Tracing

Trace IDs are generated at the Gateway and propagated to downstream services.

---

## Structured Logging

JSON structured logs using Pino include:

- traceId
- service name
- timestamps
- request metadata

---

## Resiliency Pattern

Implemented:

- timeout
- retry with backoff

using Axios Retry.

### Why this approach?

This approach provides resilience against transient service failures while preventing indefinite request hangs.

---

## Graceful Degradation

If Account Service becomes unavailable:

- POST /events returns 503
- Event retrieval APIs continue functioning
- Gateway remains operational

---

# Running The Application

## Option 1 — Docker Compose

### Build

```bash
docker-compose build
```

### Start

```bash
docker-compose up
```

---

# Services

| Service | URL |
|---|---|
| Gateway | http://localhost:3000 |
| Account | http://localhost:3001 |

---

# Running Locally Without Docker

## Gateway Service

```bash
cd gateway-service
npm install
npm run dev
```

---

## Account Service

```bash
cd account-service
npm install
npm run dev
```

---

# Running Tests

## Gateway Tests

```bash
cd gateway-service
npm test
```

---

## Account Service

```bash
cd account-service
npm test
```

---

# Example Event Request

POST /events

```json
{
  "eventId": "evt-001",
  "accountId": "acct-123",
  "type": "CREDIT",
  "amount": 150,
  "currency": "USD",
  "eventTimestamp": "2026-05-22T12:00:00Z"
}
```
---

## Rate Limiting

Gateway APIs are protected using rate limiting to prevent excessive traffic and improve system stability.

Example:
- 100 requests per minute per client

Returns:

```http
429 Too Many Requests
```

---

# Observability

## Logging

Structured JSON logs using Pino.

---

## Metrics

Prometheus metrics exposed at:

```text
/metrics
```

---

## Health Checks

Health endpoints verify:

- service availability
- database connectivity

---

# Testing Coverage

Implemented tests for:

- validation
- idempotency
- trace propagation
- resiliency behavior
- integration flows
- balance calculations

---


# Author

Sairamam Chavatapalli