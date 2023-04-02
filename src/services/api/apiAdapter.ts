import globalAxios, { AxiosError } from 'axios';
import { API_URL } from 'shared/config/api';

import { BuildingsApi } from './api/buildings-api';
import { PartnersApi } from './api/partners-api';

type GetToken = (resource?: string | undefined) => Promise<string | undefined>;

export class Api {
  partners: PartnersApi = new PartnersApi();
  building: BuildingsApi = new BuildingsApi();

  getAccessToken: GetToken;

  constructor(getAccessToken: GetToken) {
    this.getAccessToken = getAccessToken;
    this.setDefaults();
  }

  private setDefaults = () => {
    globalAxios.interceptors.response.use(
      (config) => config,
      (error: AxiosError<any>) => {
        throw error;
      },
    );
    globalAxios.interceptors.request.use(
      async (config) => {
        const token = await this.getAccessToken(API_URL);
        config.headers.setAuthorization(`Bearer ${token}`, true);
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  };
}
