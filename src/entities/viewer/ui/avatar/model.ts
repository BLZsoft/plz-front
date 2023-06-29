import * as viewerModel from '../../model';

export const $isLoading = viewerModel.$isLoading;
export const $picture = viewerModel.$viewer.map((v) => v?.picture);
