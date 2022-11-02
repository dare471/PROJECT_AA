type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType]: ObjectType[Key] extends object
		? `${Key extends infer K extends string ? K : never}` | `${Key extends infer K extends string ? K : never}.${NestedKeyOf<ObjectType[Key]> extends infer U extends string ? U : never}`
		: Key
}[keyof ObjectType]

export const verifyArray = <T>(array: T[] | undefined): boolean => Array.isArray(array) && array.length > 0

export const verifyObjectKeys = <T extends object>(object: T | undefined, path: NestedKeyOf<T>): boolean => object && path.toString().split('.').reduce((prevObject, item): any => {

    if(prevObject[item as keyof typeof prevObject]) {
      return prevObject[item as keyof typeof prevObject]
    }
  
    return undefined

}, object) ? true : false

