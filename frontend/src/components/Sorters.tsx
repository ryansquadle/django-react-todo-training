import React, { ReactElement } from "react";

export interface ISortersProps<T> {
    object: T;
    onChangeSorter: (
        sortProperty: keyof T,
        isDescending: boolean
    ) => void;
}

export default function Sorters<T extends object = {}>(props: ISortersProps<T>): ReactElement {
    const { object, onChangeSorter } = props;
    return (
        <>
            <select
                id="sorters"
                className="form-select"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
                    onChangeSorter(
                        event.target.value.split(",")[0] as any,
                        event.target.value.split(",")[1] === "true"
                    )
                }
                defaultValue={["title", "true"]}
            >
                {Object.keys(object).map((key) => {
                    if (!key) {
                        return <></>
                    }
                    return (
                        <>
                            <option
                                key={`${key}-true`}
                                value={[key, "true"]}
                            >
                                sort by '{key}' descending
                            </option>
                            <option
                                key={`${key}-false`}
                                value={[key, "false"]}
                            >
                                sort by '{key}' ascending
                            </option>
                        </>
                    );
                })}
            </select>
        </>
    );
}