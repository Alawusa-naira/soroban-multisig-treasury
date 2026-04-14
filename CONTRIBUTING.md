# Contributing to Soroban Multi-Sig Treasury Suite

First off, thank you for considering contributing to the flagship multi-sig module for Stellar! It's people like you that make the open-source ecosystem a better place.

## 🌈 Roadmap & Needs

We are currently in **Phase 1 (Scaffold)**. We have identified several high-value areas where contributors can make a massive impact:

### Tier 1: Core Contract Enhancements
- **[Feature] Mutable Threshold Management:** Currently, the signature threshold is immutable. We need a secure mechanism for admins to propose and approve a change in the threshold logic.
- **[Feature] Timelocks:** Implement optional timelocks for large value transfers.

### Tier 2: Backend & Reliability
- **[Infrastructure] Database Migration:** Replace the mock `db.json` with a production-ready Postgres/Prisma setup.
- **[Security] Signature Verification:** Add backend logic to verify that the XDR being stored matches the contract's expected format.

### Tier 3: Frontend & UX
- **[UX] Transaction Builder:** A visual UI for building complex Soroban invocations without manual XDR editing.
- **[Design] Dark/Light Mode:** Full theme support using CSS variables.

## 🛠️ Development Workflow

1. **Fork the repo** and create your branch from `main`.
2. **Install dependencies:** `npm install`.
3. **Run the suite:** `npm run dev`.
4. **Test your changes:**
   - Contract tests: `cd packages/contracts && cargo test`
   - Frontend/Backend lint: `npm run lint`
5. **Submit a Pull Request** with a clear description of the problem and solution.

## 📜 Code of Conduct

We are committed to providing a friendly, safe and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

---
*Let's build the future of Stellar together!*
