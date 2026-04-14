'use client';

import { useState, useEffect } from 'react';
import {
  isConnected,
  getPublicKey,
  setAllowed,
} from '@stellar/freighter-api';

export function useStellarWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const connected = await isConnected();
      if (!connected) {
        throw new Error('Freighter not found');
      }

      const allowed = await setAllowed();
      if (!allowed) {
        throw new Error('User did not allow Freighter');
      }

      const publicKey = await getPublicKey();
      setAddress(publicKey);
    } catch (err: any) {
      setError(err.message || 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  useEffect(() => {
    // Check if already allowed and connected on mount
    const checkConnection = async () => {
      if (await isConnected()) {
        const publicKey = await getPublicKey();
        if (publicKey) {
          setAddress(publicKey);
        }
      }
    };
    checkConnection();
  }, []);

  return { address, isConnecting, error, connect, disconnect };
}
