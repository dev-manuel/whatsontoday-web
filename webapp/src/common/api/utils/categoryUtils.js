
/**
 * Returns an object with an arry that contains the first n category names of the category object and a property which determines if the array is empty
 * @param {[{id: number, name: string, parentId: number}]} categories 
 * @param {number} n 
 */
export const maxNameMapping = (categories, n) => {
    return {
        categoryNameList: categories.slice(0, n).map(category => category.name),
        noCategories: categories.length === 0,
    };
}