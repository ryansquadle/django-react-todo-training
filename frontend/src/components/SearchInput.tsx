import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface ISearchProps {
    onChangeSearchQuery: (searchQuery: string) => void;
}

export default function SearchInput(props: ISearchProps) {
    const [searchQuery, setSearchQuery] = useState<string | undefined>();
    const { onChangeSearchQuery } = props;
    const debouncedSearchQuery = useDebounce(searchQuery, 250);

    useEffect(() => {
        if (debouncedSearchQuery !== undefined) {
            onChangeSearchQuery(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onChangeSearchQuery]);

    return (
        <input
            id="search"
            className="form-control full-width"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            onChange={(event) => setSearchQuery(event.target.value)}
        />
    );
}
