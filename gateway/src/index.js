const express = require('express');
const pino = require('pino');
const logger = pino();

const app = express();
app.use(express.json());

// Middleware to add trace ID
app.use((req, res, next) => {
  req.traceId = req.headers['x-trace-id'] || require('uuid').v4();
  req.logger = logger.child({ traceId: req.traceId, service: 'gateway' });
  res.setHeader('x-trace-id', req.traceId);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'event-gateway',
    timestamp: new Date().toISOString()
  });
});

// Placeholder endpoints
app.post('/events', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

app.get('/events/:id', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

app.get('/events', (req, res) => {
  res.status(501).json({ error: 'Not implemented yet' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Event Gateway listening');
});

module.exports = app;
