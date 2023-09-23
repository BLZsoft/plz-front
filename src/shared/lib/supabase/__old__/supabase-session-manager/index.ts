import { createClient, SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import jwt_decode from 'jwt-decode';

import { ISupabaseSessionProvider, ISupabaseSessionStorage, SupabaseSession, SupabaseTokenSchema } from './types';

export type SupabaseSessionManagerParams<
  Database = never,
  SchemaName extends string & keyof Database = 'public' extends keyof Database ? 'public' : string & keyof Database,
> = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseOptions?: SupabaseClientOptions<SchemaName>;
  sessionProvider: ISupabaseSessionProvider;
  sessionStorage: ISupabaseSessionStorage;
};

export class SupabaseSessionManager<
  Database = never,
  SchemaName extends string & keyof Database = 'public' extends keyof Database ? 'public' : string & keyof Database,
> {
  private _client: SupabaseClient<Database, SchemaName> | null = null;

  private async getExternalSession(): Promise<string> {
    return this.params.sessionProvider.getToken();
  }

  private async exchange(externalSession: string): Promise<SupabaseSession> {
    console.log('[SupabaseManager]: exchange');

    const exchangeClient = createClient(this.params.supabaseUrl, this.params.supabaseAnonKey);

    const exchangeResult = await exchangeClient.functions.invoke<string>('exchangeToken', {
      headers: {
        Authorization: `Bearer ${externalSession}`,
      },
    });

    if (!exchangeResult.data) {
      throw exchangeResult.error;
    }

    const validateResult = SupabaseTokenSchema.safeParse(jwt_decode(exchangeResult.data));

    if (!validateResult.success) {
      throw validateResult.error;
    }

    return { token: exchangeResult.data, expiresAt: validateResult.data.exp };
  }

  private async getStorageSession(): Promise<SupabaseSession | null> {
    return this.params.sessionStorage.get();
  }

  private async saveSession(session: SupabaseSession): Promise<SupabaseSession> {
    const saved = await this.params.sessionStorage.save(session);

    if (!saved) {
      throw new Error('Cannot save session into storage');
    }

    return saved;
  }

  private async getActiveSession(): Promise<SupabaseSession | null> {
    const storageSession = await this.getStorageSession();

    if (storageSession && storageSession.expiresAt > Date.now() / 1000) {
      return storageSession;
    }

    return null;
  }

  private createAuthenticatedSupabaseClient(session: SupabaseSession) {
    console.log('[SupabaseManager]: createAuthenticatedSupabaseClient');

    return createClient(this.params.supabaseUrl, this.params.supabaseAnonKey, {
      ...(this.params.supabaseOptions ?? {}),
      global: {
        ...(this.params.supabaseOptions?.global ?? {}),
        headers: {
          ...(this.params.supabaseOptions?.global?.headers ?? {}),
          authorization: `Bearer ${session.token}`,
        },
      },
    });
  }

  constructor(private readonly params: SupabaseSessionManagerParams<Database, SchemaName>) {
    console.log('[SupabaseManager]: constructor');
  }

  public async getClient(): Promise<SupabaseClient<Database, SchemaName>> {
    const activeSession = await this.getActiveSession();

    if (activeSession) {
      if (!this._client) {
        this._client = this.createAuthenticatedSupabaseClient(activeSession);
      }

      return this._client;
    }

    const externalSession = await this.getExternalSession();

    const newSession = await this.exchange(externalSession);

    await this.saveSession(newSession);

    this._client = this.createAuthenticatedSupabaseClient(newSession);

    return this._client;
  }
}
