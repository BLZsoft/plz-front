import jwtDecode from 'jwt-decode';
import { z } from 'zod';

const SupabaseTokenSchema = z.object({
  jti: z.string(),
  sub: z.string(),
  iat: z.number(),
  exp: z.number(),
  scope: z.string(),
  client_id: z.string(),
  iss: z.string(),
});

export function parse(token: string | null) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return SupabaseTokenSchema.parse(decoded);
  } catch {
    return null;
  }
}
