
/**
 * 
 * @param {string} category 
 * @param {*} categoryDict 
 */
export const categoryTranslation = (category, categoryDict) => {
    if(categoryDict.hasOwnProperty(category)){
        return categoryDict[category];
    } else {
        return category;
    }
}