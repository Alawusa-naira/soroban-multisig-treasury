#![cfg(test)]

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::{token, Address, Env, Vec};

#[test]
fn test_vault_flow() {
    let env = Env::default();
    env.mock_all_auths();

    let admin1 = Address::generate(&env);
    let admin2 = Address::generate(&env);
    let recipient = Address::generate(&env);

    let admins = Vec::from_array(&env, [admin1.clone(), admin2.clone()]);
    let threshold = 2;

    let contract_id = env.register_contract(None, MultiSigVault);
    let client = MultiSigVaultClient::new(&env, &contract_id);

    // Initialize
    client.init(&admins, &threshold);

    // Setup mock token
    let token_admin = Address::generate(&env);
    let token_contract_id = env.register_stellar_asset_contract_v2(token_admin.clone());
    let token_client = token::Client::new(&env, &token_contract_id.address());
    let token_admin_client = token::StellarAssetClient::new(&env, &token_contract_id.address());

    // Mint tokens to vault
    token_admin_client.mint(&contract_id, &1000);
    assert_eq!(token_client.balance(&contract_id), 1000);

    // Propose
    let tx_id = client.propose(&admin1, &recipient, &500, &token_contract_id.address());
    assert_eq!(tx_id, 0);

    // Approve 1
    client.approve(&admin1, &tx_id);
    let proposal = client.get_proposal(&tx_id);
    assert_eq!(proposal.approvals.len(), 1);

    // Try execute (should fail as threshold is 2)
    let result = client.try_execute(&tx_id);
    assert!(result.is_err());

    // Approve 2
    client.approve(&admin2, &tx_id);
    
    // Execute
    client.execute(&tx_id);

    // Check final state
    assert_eq!(token_client.balance(&recipient), 500);
    assert_eq!(token_client.balance(&contract_id), 500);
    let proposal = client.get_proposal(&tx_id);
    assert!(proposal.executed);
}
