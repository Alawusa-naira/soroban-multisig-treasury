#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, Address, Env, Map, Symbol, Vec,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct TransactionProposal {
    pub to: Address,
    pub amount: i128,
    pub asset: Address,
    pub approvals: Vec<Address>,
    pub executed: bool,
}

#[contracttype]
pub enum DataKey {
    Admins,
    Threshold,
    TxCounter,
    Transactions(u32),
}

#[contract]
pub struct MultiSigVault;

#[contractimpl]
impl MultiSigVault {
    /// Initialize the vault with a list of admins and a required signature threshold.
    pub fn init(env: Env, admins: Vec<Address>, threshold: u32) {
        if env.storage().persistent().has(&DataKey::Admins) {
            panic!("Vault already initialized");
        }
        if threshold == 0 || threshold > admins.len() {
            panic!("Invalid threshold");
        }

        env.storage().persistent().set(&DataKey::Admins, &admins);
        env.storage().persistent().set(&DataKey::Threshold, &threshold);
        env.storage().persistent().set(&DataKey::TxCounter, &0u32);
    }

    /// Propose a new transaction. Only admins can propose.
    pub fn propose(env: Env, proposer: Address, to: Address, amount: i128, asset: Address) -> u32 {
        proposer.require_auth();
        Self::ensure_admin(&env, &proposer);

        let mut counter: u32 = env.storage().persistent().get(&DataKey::TxCounter).unwrap_or(0);
        let proposal = TransactionProposal {
            to,
            amount,
            asset,
            approvals: Vec::new(&env),
            executed: false,
        };

        env.storage().persistent().set(&DataKey::Transactions(counter), &proposal);
        env.storage().persistent().set(&DataKey::TxCounter, &(counter + 1));

        env.events().publish(
            (symbol_short!("vault"), symbol_short!("propose")),
            (counter, proposer),
        );

        counter
    }

    /// Approve a pending transaction. Only admins can approve.
    pub fn approve(env: Env, admin: Address, tx_id: u32) {
        admin.require_auth();
        Self::ensure_admin(&env, &admin);

        let mut proposal: TransactionProposal = env
            .storage()
            .persistent()
            .get(&DataKey::Transactions(tx_id))
            .expect("Transaction not found");

        if proposal.executed {
            panic!("Transaction already executed");
        }

        // Check if already approved
        for existing_admin in proposal.approvals.iter() {
            if existing_admin == admin {
                panic!("Admin already approved this transaction");
            }
        }

        proposal.approvals.push_back(admin.clone());
        env.storage().persistent().set(&DataKey::Transactions(tx_id), &proposal);

        env.events().publish(
            (symbol_short!("vault"), symbol_short!("approve")),
            (tx_id, admin),
        );
    }

    /// Execute a transaction if the threshold of approvals is met.
    pub fn execute(env: Env, tx_id: u32) {
        let mut proposal: TransactionProposal = env
            .storage()
            .persistent()
            .get(&DataKey::Transactions(tx_id))
            .expect("Transaction not found");

        if proposal.executed {
            panic!("Transaction already executed");
        }

        let threshold: u32 = env.storage().persistent().get(&DataKey::Threshold).unwrap();
        if proposal.approvals.len() < threshold {
            panic!("Threshold not met");
        }

        proposal.executed = true;
        env.storage().persistent().set(&DataKey::Transactions(tx_id), &proposal);

        // Perform the transfer
        let token_client = token::Client::new(&env, &proposal.asset);
        token_client.transfer(&env.current_contract_address(), &proposal.to, &proposal.amount);

        env.events().publish(
            (symbol_short!("vault"), symbol_short!("execute")),
            tx_id,
        );
    }

    // --- Helpers ---

    fn ensure_admin(env: &Env, address: &Address) {
        let admins: Vec<Address> = env.storage().persistent().get(&DataKey::Admins).unwrap();
        if !admins.contains(address) {
            panic!("Not an admin");
        }
    }

    pub fn get_proposal(env: Env, tx_id: u32) -> TransactionProposal {
        env.storage()
            .persistent()
            .get(&DataKey::Transactions(tx_id))
            .expect("Transaction not found")
    }

    pub fn get_threshold(env: Env) -> u32 {
        env.storage().persistent().get(&DataKey::Threshold).unwrap_or(0)
    }
}

#[cfg(test)]
mod test;
