/* tslint:disable */
/* eslint-disable */
/**
 * Новосибирск BMW Клуб API
 * API спецификация api.bmw-nsk.ru
 *
 * The version of the OpenAPI document: 1.0
 * Contact: evist0@dblade.tech
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { UploadControllerUpload401Response } from '../models';
// @ts-ignore
import { UploadControllerUpload422Response } from '../models';
// @ts-ignore
import { UploadResultDto } from '../models';
/**
 * CommonApi - axios parameter creator
 * @export
 */
export const CommonApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Загружает файлы во временное хранилище.
         * @param {Array<File>} [files] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadControllerUpload: async (files?: Array<File>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/upload`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (files) {
                files.forEach((element) => {
                    localVarFormParams.append('files', element as any);
                })
            }

    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CommonApi - functional programming interface
 * @export
 */
export const CommonApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CommonApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Загружает файлы во временное хранилище.
         * @param {Array<File>} [files] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadControllerUpload(files?: Array<File>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UploadResultDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadControllerUpload(files, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CommonApi - factory interface
 * @export
 */
export const CommonApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CommonApiFp(configuration)
    return {
        /**
         * 
         * @summary Загружает файлы во временное хранилище.
         * @param {CommonApiUploadControllerUploadRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadControllerUpload(requestParameters: CommonApiUploadControllerUploadRequest = {}, options?: AxiosRequestConfig): AxiosPromise<UploadResultDto> {
            return localVarFp.uploadControllerUpload(requestParameters.files, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for uploadControllerUpload operation in CommonApi.
 * @export
 * @interface CommonApiUploadControllerUploadRequest
 */
export interface CommonApiUploadControllerUploadRequest {
    /**
     * 
     * @type {Array<File>}
     * @memberof CommonApiUploadControllerUpload
     */
    readonly files?: Array<File>
}

/**
 * CommonApi - object-oriented interface
 * @export
 * @class CommonApi
 * @extends {BaseAPI}
 */
export class CommonApi extends BaseAPI {
    /**
     * 
     * @summary Загружает файлы во временное хранилище.
     * @param {CommonApiUploadControllerUploadRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommonApi
     */
    public uploadControllerUpload(requestParameters: CommonApiUploadControllerUploadRequest = {}, options?: AxiosRequestConfig) {
        return CommonApiFp(this.configuration).uploadControllerUpload(requestParameters.files, options).then((request) => request(this.axios, this.basePath));
    }
}
