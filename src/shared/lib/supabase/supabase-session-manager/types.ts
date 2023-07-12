import { z } from 'zod';

export const SupabaseTokenSchema = z.object({
  jti: z.string(),
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
  scope: z.string(),
  client_id: z.string(),
  iss: z.string(),
});

export const SupabaseSessionSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
});

export type SupabaseSession = z.infer<typeof SupabaseSessionSchema>;

export interface ISupabaseSessionStorage {
  get(): Promise<SupabaseSession | null> | SupabaseSession | null;

  save(session: SupabaseSession): Promise<SupabaseSession | null> | SupabaseSession | null;
}

export interface ISupabaseSessionProvider {
  getToken(): Promise<string>;
}
