import HashConnect from 'hashconnect';

export interface HashPackConnectorOptions {
  chains?: any[];
}

// Lightweight connector wrapper for HashPack/HashConnect.
// We avoid depending on a specific "Connector" interface here because
// wagmi/rainbowkit connector shapes differ across versions and this file
// previously referenced an undefined `WalletConnector` type. Keep runtime
// behavior simple and typed as `any` where the external package types are
// uncertain.
export class HashPackConnector {
  readonly id = 'hashpack';
  readonly name = 'HashPack';
  readonly ready = typeof window !== 'undefined';
  // Use `any` for the hashconnect instance to avoid depending on package types
  // which can change between releases.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private hashConnect: any;
  private chains: any[];

  constructor({ chains = [] }: HashPackConnectorOptions) {
    this.chains = chains;
    // Delay creating the HashConnect instance until connect() to avoid
    // constructor signature/type issues with different package versions.
    this.hashConnect = null;
  }

  async connect(): Promise<any> {
    try {
      // Ensure we have a runtime HashConnect instance. Use dynamic import
      // to avoid depending on a specific export shape at compile time.
      if (!this.hashConnect) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const module: any = await import('hashconnect');
        const HashConnectCtor = module?.default ?? module?.HashConnect;
        // Construct with common args; adjust if your hashconnect version needs
        // different constructor parameters.
        this.hashConnect = new HashConnectCtor();
      }

      if (this.hashConnect.init) {
        await this.hashConnect.init({
          appMetadata: {
            name: 'Verdant Vault',
            description: 'Carbon Credit Trading Platform',
            icon: 'https://verdant-vault.com/logo.png',
          },
          network: 'mainnet',
        });
      }

      const state = this.hashConnect.connect
        ? await this.hashConnect.connect()
        : null;
      if (!state) throw new Error('Failed to connect to HashPack');

      const accountId = state.topic;

      return {
        account: accountId,
        chain: {
          id: this.chains[0]?.id,
          unsupported: false,
        },
      };
    } catch (error) {
      console.error('HashPack connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.hashConnect && this.hashConnect.disconnect) {
        await this.hashConnect.disconnect();
      }
    } catch (err) {
      console.warn('Error disconnecting HashPack:', err);
    }
  }

  async getAccount(): Promise<string | null> {
    try {
      if (!this.hashConnect || !this.hashConnect.getConnectionState) return null;
      const state = await this.hashConnect.getConnectionState();
      return state?.topic ?? null;
    } catch (err) {
      console.warn('Error getting HashPack account:', err);
      return null;
    }
  }

  async getProvider(): Promise<any> {
    return this.hashConnect;
  }

  async isAuthorized(): Promise<boolean> {
    try {
      if (!this.hashConnect || !this.hashConnect.getConnectionState) return false;
  const state = await this.hashConnect.getConnectionState?.();
      return !!state?.topic;
    } catch {
      return false;
    }
  }

  protected onAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) this.disconnect();
  }

  protected onChainChanged(chainId: number | string) {
    // Handle chain changes if needed
  }

  protected onDisconnect() {
    this.disconnect();
  }
}