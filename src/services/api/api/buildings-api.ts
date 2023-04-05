/* tslint:disable */
/* eslint-disable */
/**
 * Пожликбез APIирск BMW Клуб API
 * API спецификация api.bmw-nsk.ru
 *
 * The version of the OpenAPI document: 1.0
 * Contact: kurskatm@gmail.com
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
import { BuildingEntity } from '../models';
// @ts-ignore
import { BuildingsControllerFindAll200Response } from '../models';
// @ts-ignore
import { BuildingsControllerFindOne404Response } from '../models';
// @ts-ignore
import { CreateBuildingDto } from '../models';
// @ts-ignore
import { PartnersControllerFindAll401Response } from '../models';
// @ts-ignore
import { PartnersControllerFindAll403Response } from '../models';
// @ts-ignore
import { UpdateBuildingDto } from '../models';
/**
 * BuildingsApi - axios parameter creator
 * @export
 */
export const BuildingsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Добавляет новое заведение партнёру.
         * @param {string} partnerId 
         * @param {CreateBuildingDto} createBuildingDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerCreate: async (partnerId: string, createBuildingDto: CreateBuildingDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'partnerId' is not null or undefined
            assertParamExists('buildingsControllerCreate', 'partnerId', partnerId)
            // verify required parameter 'createBuildingDto' is not null or undefined
            assertParamExists('buildingsControllerCreate', 'createBuildingDto', createBuildingDto)
            const localVarPath = `/partners/{partnerId}/buildings`
                .replace(`{${"partnerId"}}`, encodeURIComponent(String(partnerId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createBuildingDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Возвращает список заведений партнёра.
         * @param {string} partnerId 
         * @param {number} [skip] 
         * @param {number} [take] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerFindAll: async (partnerId: string, skip?: number, take?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'partnerId' is not null or undefined
            assertParamExists('buildingsControllerFindAll', 'partnerId', partnerId)
            const localVarPath = `/partners/{partnerId}/buildings`
                .replace(`{${"partnerId"}}`, encodeURIComponent(String(partnerId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (skip !== undefined) {
                localVarQueryParameter['skip'] = skip;
            }

            if (take !== undefined) {
                localVarQueryParameter['take'] = take;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Возвращает указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerFindOne: async (partnerId: string, id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'partnerId' is not null or undefined
            assertParamExists('buildingsControllerFindOne', 'partnerId', partnerId)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('buildingsControllerFindOne', 'id', id)
            const localVarPath = `/partners/{partnerId}/buildings/{id}`
                .replace(`{${"partnerId"}}`, encodeURIComponent(String(partnerId)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Удаляет указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerRemove: async (partnerId: string, id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'partnerId' is not null or undefined
            assertParamExists('buildingsControllerRemove', 'partnerId', partnerId)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('buildingsControllerRemove', 'id', id)
            const localVarPath = `/partners/{partnerId}/buildings/{id}`
                .replace(`{${"partnerId"}}`, encodeURIComponent(String(partnerId)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Обновляет указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {UpdateBuildingDto} updateBuildingDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerUpdate: async (partnerId: string, id: number, updateBuildingDto: UpdateBuildingDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'partnerId' is not null or undefined
            assertParamExists('buildingsControllerUpdate', 'partnerId', partnerId)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('buildingsControllerUpdate', 'id', id)
            // verify required parameter 'updateBuildingDto' is not null or undefined
            assertParamExists('buildingsControllerUpdate', 'updateBuildingDto', updateBuildingDto)
            const localVarPath = `/partners/{partnerId}/buildings/{id}`
                .replace(`{${"partnerId"}}`, encodeURIComponent(String(partnerId)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateBuildingDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BuildingsApi - functional programming interface
 * @export
 */
export const BuildingsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BuildingsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Добавляет новое заведение партнёру.
         * @param {string} partnerId 
         * @param {CreateBuildingDto} createBuildingDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buildingsControllerCreate(partnerId: string, createBuildingDto: CreateBuildingDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BuildingEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buildingsControllerCreate(partnerId, createBuildingDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Возвращает список заведений партнёра.
         * @param {string} partnerId 
         * @param {number} [skip] 
         * @param {number} [take] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buildingsControllerFindAll(partnerId: string, skip?: number, take?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BuildingsControllerFindAll200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buildingsControllerFindAll(partnerId, skip, take, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Возвращает указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buildingsControllerFindOne(partnerId: string, id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BuildingEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buildingsControllerFindOne(partnerId, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Удаляет указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buildingsControllerRemove(partnerId: string, id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BuildingEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buildingsControllerRemove(partnerId, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Обновляет указанное заведение партнёра.
         * @param {string} partnerId 
         * @param {number} id 
         * @param {UpdateBuildingDto} updateBuildingDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buildingsControllerUpdate(partnerId: string, id: number, updateBuildingDto: UpdateBuildingDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BuildingEntity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buildingsControllerUpdate(partnerId, id, updateBuildingDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * BuildingsApi - factory interface
 * @export
 */
export const BuildingsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BuildingsApiFp(configuration)
    return {
        /**
         * 
         * @summary Добавляет новое заведение партнёру.
         * @param {BuildingsApiBuildingsControllerCreateRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerCreate(requestParameters: BuildingsApiBuildingsControllerCreateRequest, options?: AxiosRequestConfig): AxiosPromise<BuildingEntity> {
            return localVarFp.buildingsControllerCreate(requestParameters.partnerId, requestParameters.createBuildingDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Возвращает список заведений партнёра.
         * @param {BuildingsApiBuildingsControllerFindAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerFindAll(requestParameters: BuildingsApiBuildingsControllerFindAllRequest, options?: AxiosRequestConfig): AxiosPromise<BuildingsControllerFindAll200Response> {
            return localVarFp.buildingsControllerFindAll(requestParameters.partnerId, requestParameters.skip, requestParameters.take, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Возвращает указанное заведение партнёра.
         * @param {BuildingsApiBuildingsControllerFindOneRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerFindOne(requestParameters: BuildingsApiBuildingsControllerFindOneRequest, options?: AxiosRequestConfig): AxiosPromise<BuildingEntity> {
            return localVarFp.buildingsControllerFindOne(requestParameters.partnerId, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Удаляет указанное заведение партнёра.
         * @param {BuildingsApiBuildingsControllerRemoveRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerRemove(requestParameters: BuildingsApiBuildingsControllerRemoveRequest, options?: AxiosRequestConfig): AxiosPromise<BuildingEntity> {
            return localVarFp.buildingsControllerRemove(requestParameters.partnerId, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Обновляет указанное заведение партнёра.
         * @param {BuildingsApiBuildingsControllerUpdateRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buildingsControllerUpdate(requestParameters: BuildingsApiBuildingsControllerUpdateRequest, options?: AxiosRequestConfig): AxiosPromise<BuildingEntity> {
            return localVarFp.buildingsControllerUpdate(requestParameters.partnerId, requestParameters.id, requestParameters.updateBuildingDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for buildingsControllerCreate operation in BuildingsApi.
 * @export
 * @interface BuildingsApiBuildingsControllerCreateRequest
 */
export interface BuildingsApiBuildingsControllerCreateRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildingsApiBuildingsControllerCreate
     */
    readonly partnerId: string

    /**
     * 
     * @type {CreateBuildingDto}
     * @memberof BuildingsApiBuildingsControllerCreate
     */
    readonly createBuildingDto: CreateBuildingDto
}

/**
 * Request parameters for buildingsControllerFindAll operation in BuildingsApi.
 * @export
 * @interface BuildingsApiBuildingsControllerFindAllRequest
 */
export interface BuildingsApiBuildingsControllerFindAllRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildingsApiBuildingsControllerFindAll
     */
    readonly partnerId: string

    /**
     * 
     * @type {number}
     * @memberof BuildingsApiBuildingsControllerFindAll
     */
    readonly skip?: number

    /**
     * 
     * @type {number}
     * @memberof BuildingsApiBuildingsControllerFindAll
     */
    readonly take?: number
}

/**
 * Request parameters for buildingsControllerFindOne operation in BuildingsApi.
 * @export
 * @interface BuildingsApiBuildingsControllerFindOneRequest
 */
export interface BuildingsApiBuildingsControllerFindOneRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildingsApiBuildingsControllerFindOne
     */
    readonly partnerId: string

    /**
     * 
     * @type {number}
     * @memberof BuildingsApiBuildingsControllerFindOne
     */
    readonly id: number
}

/**
 * Request parameters for buildingsControllerRemove operation in BuildingsApi.
 * @export
 * @interface BuildingsApiBuildingsControllerRemoveRequest
 */
export interface BuildingsApiBuildingsControllerRemoveRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildingsApiBuildingsControllerRemove
     */
    readonly partnerId: string

    /**
     * 
     * @type {number}
     * @memberof BuildingsApiBuildingsControllerRemove
     */
    readonly id: number
}

/**
 * Request parameters for buildingsControllerUpdate operation in BuildingsApi.
 * @export
 * @interface BuildingsApiBuildingsControllerUpdateRequest
 */
export interface BuildingsApiBuildingsControllerUpdateRequest {
    /**
     * 
     * @type {string}
     * @memberof BuildingsApiBuildingsControllerUpdate
     */
    readonly partnerId: string

    /**
     * 
     * @type {number}
     * @memberof BuildingsApiBuildingsControllerUpdate
     */
    readonly id: number

    /**
     * 
     * @type {UpdateBuildingDto}
     * @memberof BuildingsApiBuildingsControllerUpdate
     */
    readonly updateBuildingDto: UpdateBuildingDto
}

/**
 * BuildingsApi - object-oriented interface
 * @export
 * @class BuildingsApi
 * @extends {BaseAPI}
 */
export class BuildingsApi extends BaseAPI {
    /**
     * 
     * @summary Добавляет новое заведение партнёру.
     * @param {BuildingsApiBuildingsControllerCreateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BuildingsApi
     */
    public buildingsControllerCreate(requestParameters: BuildingsApiBuildingsControllerCreateRequest, options?: AxiosRequestConfig) {
        return BuildingsApiFp(this.configuration).buildingsControllerCreate(requestParameters.partnerId, requestParameters.createBuildingDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Возвращает список заведений партнёра.
     * @param {BuildingsApiBuildingsControllerFindAllRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BuildingsApi
     */
    public buildingsControllerFindAll(requestParameters: BuildingsApiBuildingsControllerFindAllRequest, options?: AxiosRequestConfig) {
        return BuildingsApiFp(this.configuration).buildingsControllerFindAll(requestParameters.partnerId, requestParameters.skip, requestParameters.take, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Возвращает указанное заведение партнёра.
     * @param {BuildingsApiBuildingsControllerFindOneRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BuildingsApi
     */
    public buildingsControllerFindOne(requestParameters: BuildingsApiBuildingsControllerFindOneRequest, options?: AxiosRequestConfig) {
        return BuildingsApiFp(this.configuration).buildingsControllerFindOne(requestParameters.partnerId, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Удаляет указанное заведение партнёра.
     * @param {BuildingsApiBuildingsControllerRemoveRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BuildingsApi
     */
    public buildingsControllerRemove(requestParameters: BuildingsApiBuildingsControllerRemoveRequest, options?: AxiosRequestConfig) {
        return BuildingsApiFp(this.configuration).buildingsControllerRemove(requestParameters.partnerId, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Обновляет указанное заведение партнёра.
     * @param {BuildingsApiBuildingsControllerUpdateRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BuildingsApi
     */
    public buildingsControllerUpdate(requestParameters: BuildingsApiBuildingsControllerUpdateRequest, options?: AxiosRequestConfig) {
        return BuildingsApiFp(this.configuration).buildingsControllerUpdate(requestParameters.partnerId, requestParameters.id, requestParameters.updateBuildingDto, options).then((request) => request(this.axios, this.basePath));
    }
}
