import {createEventTargetLink} from './createTargetLinks'
import {sqlTimestampToDate, dateToSqlTimestamp} from './sqlTimeParsing'

/**
 * @typedef {{id:number,name:string,parentId:string}} categoryResponse
 *
 * @typedef {{id:number,name:string,loginFk: number}} OrganizerResponse
 *
 * @typedef {{id:number,name:string,latitude:number,longitude:number,country:string,city: string,street:string}} LocationResponse
 *
 * @typedef {{id:number,tag:string}} ImageResponse
 *
 * @typedef {{id:number,name:string,avgRating:number,description:string,from:Date,to:Date,categories:[categoryResponse],location:LocationResponse,images:[ImageResponse],participantCount:number}} EventResponse
 */

/**
 * 
 * @param {EventResponse} eventResponse 
 */
export const mapEvent = eventResponse => ({
    id: eventResponse.id,
    name: eventResponse.name,
    from: sqlTimestampToDate(eventResponse.from),
    to: sqlTimestampToDate(eventResponse.to),
    categories: eventResponse.categories, 
    description: eventResponse.description,
    // imageURI: '#', //Todo
    target: createEventTargetLink(eventResponse.id)
})