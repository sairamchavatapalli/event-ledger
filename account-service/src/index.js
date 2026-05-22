const express = require('express');
const pino = require('pino');
const logger = pino();

const app = express();
app.use(express.json());

// Middleware to extract and log trace ID
app.use((req, res, next) => {
  req.traceId = req.headers['x-trace-id'];
  req.logger = logger.child({ traceId: req.traceId, service: 'account-service' });
  res.setHeader('x-trace-id', req.traceId);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'account-service',
    timestamp: new Date().toISOString()
  });
});

// Placeholder endpoints
app.post('/accounts/:accountId/transactions', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

app.get('/accounts/:accountId/balance', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

app.get('/accounts/:accountId', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Account Service listening');
});

module.exports = app;
