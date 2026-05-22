# Event Ledger

Distributed Event Ledger System for processing financial transactions with guaranteed correctness despite out-of-order delivery and duplicate submissions.

## Services

- **Event Gateway** (Port 3000) - Public API for event submission
- **Account Service** (Port 3001) - Internal service for transaction management

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start with Docker Compose
docker-compose up
```

See README files in each service directory for detailed documentation.
