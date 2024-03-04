import { sessionModel } from '~/shared/session';

export const $isLoading = sessionModel.fetchSessionFx.pending;
export const $picture = sessionModel.$session.map((v) => v?.picture ?? null);
