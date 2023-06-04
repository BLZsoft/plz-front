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
import { BuildingEntityCategoriesInner } from './building-entity-categories-inner';

/**
 * 
 * @export
 * @interface PostPreviewEntity
 */
export interface PostPreviewEntity {
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'description': string;
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'previewUrl': string | null;
    /**
     * 
     * @type {Array<BuildingEntityCategoriesInner>}
     * @memberof PostPreviewEntity
     */
    'categories': Array<BuildingEntityCategoriesInner>;
    /**
     * 
     * @type {boolean}
     * @memberof PostPreviewEntity
     */
    'published'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof PostPreviewEntity
     */
    'updatedAt': string;
}

