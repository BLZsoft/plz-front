import { ISupabaseSessionStorage, SupabaseSession, SupabaseSessionSchema } from '../types';

export class LocalStorageSupabaseSessionStorage implements ISupabaseSessionStorage {
  constructor(private readonly localStorageKey: string) {}

  get(): Promise<SupabaseSession | null> | SupabaseSession | null {
    const localStorageSession = localStorage.getItem(this.localStorageKey);

    if (!localStorageSession) {
      return null;
    }

    const result = SupabaseSessionSchema.safeParse(JSON.parse(localStorageSession));

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  save(session: SupabaseSession): Promise<SupabaseSession> | SupabaseSession {
    localStorage.setItem(this.localStorageKey, JSON.stringify(session));
    return session;
  }
}
