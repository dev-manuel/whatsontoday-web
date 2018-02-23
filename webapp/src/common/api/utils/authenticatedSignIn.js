import {baseUrl} from '../index'

/**
 * @readonly
 * @enum {string}
 */
export const userType = {
    USER: 'user',
    ORGANIZER: 'organizer',
}

/**
 * @readonly
 * @enum {string}
 */
export const provider = {
    FACEBOOK: 'facebook',
    GOOGLE: 'google',
}

/**
 * 
 * @param {provider} provider 
 * @param {userType} userType 
 */
export const createAuthenticatedSignInLink = (provider = provider.FACEBOOK, userType= userType.USER) => {
    return `${baseUrl}/login/authenticate/${provider}?userType=${userType}`;
}