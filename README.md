# 🛡️ Soroban Multi-Sig Treasury Suite

A professional, full-stack, open-source treasury management solution for the Stellar network. Designed for decentralized organizations (DAOs) and high-trust teams seeking Gnosis Safe-level security on Soroban.

> [!IMPORTANT]
> This project is a flagship submission for the **Drips Wave 4 Funding Program**. Our mission is to provide critical multi-sig infrastructure that empowers Stellar-based organizations to manage collective assets with transparency and security.

## 🏗️ Architecture Overview

The suite is architected as a professional monorepo using **Turborepo**, ensuring seamless interaction between on-chain logic and off-chain coordination.

### 1. 🔐 On-Chain Vault (`packages/contracts`)
A robust Soroban smart contract implemented in Rust.
- **Multi-Sig Logic:** Supports M-of-N signature thresholds.
- **Secure Transfers:** Only executes asset transfers once the immutable threshold of admin approvals is met.
- **Event-Driven:** Publishes real-time events for proposal creation, approval, and execution.

### 2. ⚡ Off-Chain Signer Coordination (`packages/backend`)
A high-performance Fastify API acting as the "Signer Middleware".
- **XDR Persistence:** Utilizes a persistent JSON-based storage (`db.json`) to store transaction payloads awaiting signatures.
- **Payload Validation:** Uses `@stellar/stellar-sdk` to decode and verify outgoing transaction data before storage.
- **Scalable Design:** Decouples signature collection from on-chain limits, allowing for complex organizational workflows.

### 3. 🎨 Dashboard Hub (`packages/frontend`)
A modern, premium Next.js 14 dashboard.
- **Wallet Integration:** Native `@stellar/freighter-api` support for secure identity management.
- **Real-time UX:** Live tracking of vault balances and pending proposals.
- **Aesthetic Excellence:** Built with Tailwind CSS and Framer Motion (concept) for a premium, institutional-grade feel.

## 🚀 Quick Start (Turborepo)

Get the entire suite running locally in under 3 minutes.

### 1. Clone & Install
```bash
git clone https://github.com/Zakky-Fat/soroban-multisig-treasury.git
cd soroban-multisig-treasury
npm install
```

### 2. Launch Development Environment
```bash
# This start all 3 layers (Contract build loop, Backend API, Frontend Dashboard)
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 🛠️ Tech Stack
- **Languages:** TypeScript, Rust
- **Frameworks:** Next.js 14, Fastify, Soroban SDK v21
- **Tooling:** Turborepo, Stellar SDK, Freighter API

---

## 🤝 Why this matters for the Stellar Ecosystem?
As the Soroban ecosystem matures, the need for community-owned treasury infrastructure is paramount. Most organizations currently rely on single-key management or disparate scripts. The **SoroVault** suite provides a verifiable, open-source standard for multi-sig asset management, significantly lowering the barrier for institutional and decentralized players to enter the Stellar network.

---
Created with ❤️ by the **Open-Source Architect** team for the Stellar community.
