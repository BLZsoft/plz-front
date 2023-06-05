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



/**
 * 
 * @export
 * @interface UpdateUserDto
 */
export interface UpdateUserDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    'username'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    'primaryEmail'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    'primaryPhone'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserDto
     */
    'avatar'?: string | null;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdateUserDto
     */
    'customData'?: { [key: string]: any; } | null;
}
