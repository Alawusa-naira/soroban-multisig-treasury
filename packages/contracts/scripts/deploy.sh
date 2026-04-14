#!/bin/bash

# Soroban Deployment Script for MultiSigVault
# Targets: Stellar Testnet

set -e

NETWORK="testnet"
RPC_URL="https://soroban-testnet.stellar.org:443"
FRIENDLY_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

echo "Building MultiSigVault contract..."
cargo build --target wasm32-unknown-unknown --release

WASM_PATH="target/wasm32-unknown-unknown/release/multisig_vault.wasm"

if [ ! -f "$WASM_PATH" ]; then
    echo "Error: WASM file not found at $WASM_PATH"
    exit 1
fi

echo "Deploying contract to $NETWORK..."

# Ensure soroban-cli is installed
if ! command -v soroban &> /dev/null; then
    echo "Error: soroban-cli is not installed. Please install it to deploy."
    exit 1
fi

# Deployment command
# soroban contract deploy \
#   --wasm $WASM_PATH \
#   --source-account my-identity \
#   --network $NETWORK

echo "---------------------------------------------------"
echo "Deployment logic scaffolded."
echo "To finish deployment:"
echo "1. Ensure you have an identity: soroban config identity create admin"
echo "2. Fund it: soroban config identity fund admin"
echo "3. Run: soroban contract deploy --wasm $WASM_PATH --source admin --network testnet"
echo "---------------------------------------------------"
