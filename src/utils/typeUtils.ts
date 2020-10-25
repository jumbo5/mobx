export type ValuesOf<T extends any[]> = T[number]

export const literalArray = <T extends string>(array: T[]): T[] => array
