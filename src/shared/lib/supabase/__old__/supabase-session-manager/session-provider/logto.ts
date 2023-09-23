import LogtoClient from '@logto/browser';

import { ISupabaseSessionProvider } from '../types';

export class LogtoSupabaseSessionProvider implements ISupabaseSessionProvider {
  constructor(
    private readonly logtoClient: LogtoClient,
    private readonly resource: string,
  ) {}

  async getToken(): Promise<string> {
    const result = await this.logtoClient.getAccessToken(this.resource);

    if (!result) {
      throw new Error(`Cannot get Logto token for resource ${this.resource}}`);
    }

    return result;
  }
}
