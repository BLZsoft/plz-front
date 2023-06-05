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


// May contain unused imports in some cases
// @ts-ignore
import { BuildingEntityOffersInner } from './building-entity-offers-inner';

/**
 * 
 * @export
 * @interface GetBuildingsResultDtoBuildingsValue
 */
export interface GetBuildingsResultDtoBuildingsValue {
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'partnerId': string;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'phone': string | null;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'city': string;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'district': string | null;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'street': string;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'houseNumber': string;
    /**
     * 
     * @type {number}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'lat': number;
    /**
     * 
     * @type {number}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'lon': number;
    /**
     * 
     * @type {Array<BuildingEntityOffersInner>}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'offers': Array<BuildingEntityOffersInner>;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'updatedAt': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof GetBuildingsResultDtoBuildingsValue
     */
    'categories': Array<string>;
}
