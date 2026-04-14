import Fastify from 'fastify';
import cors from '@fastify/cors';
import { transactionRoutes } from './routes/transactions.js';

const fastify = Fastify({
  logger: true
});

// Register CORS
await fastify.register(cors, {
  origin: true // In production, refine this
});

// Register Routes
fastify.register(transactionRoutes, { prefix: '/api/v1' });

// Health Check
fastify.get('/health', async () => {
  return { status: 'ok', suite: 'Soroban Multi-Sig Treasury' };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Backend logic coordination server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
