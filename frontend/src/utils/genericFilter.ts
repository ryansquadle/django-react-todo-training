import IFilter from "../interfaces/IFilter";

export function genericFilter<T>(object: T, filters: Array<IFilter<T>>): boolean {
    if (filters.length === 0) {
        return true;
    }

    return filters.every((filter: IFilter<T>): boolean | T[keyof T] => {
        return filter.isTruthyPicked ? object[filter.property] : !object[filter.property];
    });
}
