import React, { ChangeEvent, ReactElement, ReactNode, JSXElementConstructor } from "react";
import IFilter from "../interfaces/IFilter";

export interface IFiltersProps<T> {
    object: T;
    filters: Array<IFilter<T>>;
    onChangeFilter: (
        filterProperty: keyof T,
        checked: boolean,
        isTruthyPicked: boolean
    ) => void;
}

export function Filters<T extends object = {}>(
    props: IFiltersProps<T>
): ReactElement {
    const { object, filters, onChangeFilter } = props;

    const labelTruthy: ReactElement = (
        <>
            is <b>truthy</b>
        </>
    );

    const labelFalsy: ReactElement = (
        <>
            is <b>falsy</b>
        </>
    );

    return (
        <div className="p-1 my-2">
            <label className="mt-3">Filters! Try us too! (We also work!)</label>
            {Object.keys(object).map((key: string): ReactElement => {
                const getRadioButton: (isTruthyPicked: boolean) => ReactNode = (isTruthyPicked: boolean): ReactNode => {
                    const id: string = isTruthyPicked
                        ? `radio-defined-${key}`
                        : `radio-not-defined-${key}`;
                    const label: ReactElement<any, string | JSXElementConstructor<any>> = isTruthyPicked ? labelTruthy : labelFalsy;

                    const getChecked: () => boolean = (): boolean => {
                        const x: IFilter<T>[] = filters.filter((x: IFilter<T>): boolean => x.property === key);
                        return x.length === 1 && x[0].isTruthyPicked === isTruthyPicked;
                    };

                    return (
                        <>
                            <input
                                type="radio"
                                id={id}
                                value={key}
                                checked={getChecked()}
                                onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                                    onChangeFilter(
                                        key as any,
                                        event.target.checked,
                                        isTruthyPicked
                                    )
                                }
                                className={"m-1 ml-3"}
                            />
                            <label htmlFor={id}>
                                '{key}' {label}
                            </label>
                        </>
                    );
                };

                return (
                    <div key={key} className="input-group my-3">
                        {getRadioButton(true)}
                        {getRadioButton(false)}
                    </div>
                );
            })}
        </div>
    );
}