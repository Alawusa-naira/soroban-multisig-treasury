import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateXDR } from '../utils/stellar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../db.json');

interface Proposal {
  id: string;
  xdr: string;
  title: string;
  creator: string;
  createdAt: string;
  status: 'pending' | 'executed' | 'cancelled';
}

const readDB = (): { proposals: Proposal[] } => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

const writeDB = (data: { proposals: Proposal[] }) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export async function transactionRoutes(fastify: FastifyInstance) {
  // Submit a new proposal
  fastify.post('/propose', async (request, reply) => {
    const { xdr, title, creator } = request.body as any;

    if (!xdr || !validateXDR(xdr)) {
      return reply.status(400).send({ error: 'Invalid XDR payload' });
    }

    const db = readDB();
    const newProposal: Proposal = {
      id: Math.random().toString(36).substring(7),
      xdr,
      title: title || 'Untitled Proposal',
      creator,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    db.proposals.push(newProposal);
    writeDB(db);

    return reply.status(201).send(newProposal);
  });

  // Get all pending transactions
  fastify.get('/pending', async (request, reply) => {
    const db = readDB();
    const pending = db.proposals.filter(p => p.status === 'pending');
    return reply.send(pending);
  });
}
