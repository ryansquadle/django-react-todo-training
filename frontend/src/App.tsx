import React, { memo, useEffect, useState, useCallback, ReactElement } from "react";
import axios, { AxiosResponse } from "axios";
import { useWhatChanged } from "@simbathesailor/use-what-changed";
import Modal from "./components/Modal";
import Button from "./components/Button";

// DATA
import { TodoCard } from "./components/TodoCard";
import ITodoItem from "./interfaces/ITodoItem";

// SORT
import { genericSort } from "./utils/genericSort";
import Sorters from "./components/Sorters";
import ISorter from "./interfaces/ISorter";

// FILTER
import { genericFilter } from "./utils/genericFilter";
import { Filters } from "./components/Filters";
import IFilter from "./interfaces/IFilter";

// SEARCH
import { genericSearch } from "./utils/genericSearch";
import SearchInput from "./components/SearchInput";

import "./App.css";

type TodoItem = {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string | null;
    priority: number;
}

function httpErrorHandler(error: unknown) {
    if (error === null) throw new Error("Unrecoverable error!! Error is null!")
    if (axios.isAxiosError(error)) {
        const response: AxiosResponse<any, any> | undefined = error?.response
        const request: any = error?.request
        // const config = error?.config //here we have access the config used to make the api call (we can make a retry using this conf)

        if (error.code === "ERR_NETWORK") {
            console.log("connection problems..")
        } else if (error.code === "ERR_CANCELED") {
            console.log("connection canceled..")
        }

        if (response) {
            const statusCode: number = response?.status
            if (statusCode === 404) {
                console.log("The requested resource does not exist or has been deleted")
            } else if (statusCode === 401) {
                console.log("Please login to access this resource")
            }
        } else if (request) {
            // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
        }
    }

    console.log(error as Error);
}

const todoInitialState: TodoItem = { title: "", description: "", completed: false, priority: 1 };

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [activeItem, setActiveItem] = useState<TodoItem>(todoInitialState);
    const [todoList, setTodoList] = useState<TodoItem[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [viewCompleted, setViewCompleted] = useState<boolean>(false);
    const [showAll, setShowAll] = useState<boolean>(false);

    const [query, setQuery] = useState<string>("");
    const [activeTodoSorter, setActiveTodoSorter] = useState<ISorter<ITodoItem>>({ property: "title", isDescending: true });
    const [activeTodoFilters, setActiveTodoFilters] = useState<Array<IFilter<ITodoItem>>>([]);

    const resultTodos: TodoItem[] = todoList
        .filter((todo: TodoItem): boolean =>
            genericSearch<ITodoItem>(todo, ["title", "description"], query)
        )
        .filter((todo: TodoItem): boolean => genericFilter<ITodoItem>(todo, activeTodoFilters))
        .sort((todoA: TodoItem, todoB: TodoItem): number =>
            genericSort<ITodoItem>(todoA, todoB, activeTodoSorter)
        );
    console.log("⚡ | file: App.tsx:86 | resultTodos:", resultTodos);

    const refreshList: () => void = useCallback((): void => {
        axios
            .get("/api/todos/")
            .then((res: AxiosResponse<any>): void => setTodoList(res.data))
            .catch(httpErrorHandler)
            .finally((): void => setLoading(false));
    }, []);

    const toggle: () => void = useCallback((): void => {
        setModal(!modal);
    }, [modal]);

    const handleSubmit: (item: TodoItem) => void = useCallback((item: TodoItem): void => {
        toggle();

        if (item.id) {
            axios
                .put(`/api/todos/${item.id}/`, item)
                .then((): void => refreshList())
                .catch(httpErrorHandler);
            return;
        }

        axios
            .post("/api/todos/", item)
            .then((): void => refreshList())
            .catch(httpErrorHandler);
    }, [refreshList, toggle]);

    const handleDelete: (item: TodoItem) => void = useCallback((item: TodoItem): void => {
        axios
            .delete(`/api/todos/${item.id}/`)
            .then((): void => refreshList())
            .catch(httpErrorHandler);
    }, [refreshList]);

    const createItem: () => void = useCallback((): void => {
        setActiveItem(todoInitialState);
        setModal(!modal);
    }, [modal]);

    const editItem: (item: TodoItem) => void = useCallback((item: TodoItem): void => {
        setActiveItem(item);
        setModal(!modal);
    }, [modal]);

    const displayCompleted: (status: boolean) => void = useCallback((status: boolean): void => {
        if (status) {
            return setViewCompleted(true);
        }

        return setViewCompleted(false);
    }, []);

    const renderTodoSearch = useCallback(() => {
        return <SearchInput onChangeSearchQuery={(query: string): void => setQuery(query)} />;
    }, []);

    const renderTodoSort = useCallback(() => {
        return (
            <Sorters<ITodoItem>
                object={todoList[0]}
                onChangeSorter={(property: keyof ITodoItem, isDescending: boolean): void => {
                    setActiveTodoSorter({
                        property,
                        isDescending,
                    });
                }}
            />
        )
    }, [todoList]);

    const renderTodoFilter = useCallback(() => {
        return (
            <Filters<ITodoItem>
                object={todoList[0]}
                filters={activeTodoFilters}
                onChangeFilter={(changedFilterProperty: keyof ITodoItem, checked: boolean, isTruthyPicked: boolean): void => {
                    checked
                        ? setActiveTodoFilters([
                            ...activeTodoFilters.filter(
                                (filter: IFilter<ITodoItem>): boolean => filter.property !== changedFilterProperty
                            ),
                            { property: changedFilterProperty, isTruthyPicked },
                        ])
                        : setActiveTodoFilters(
                            activeTodoFilters.filter(
                                (filter: IFilter<ITodoItem>): boolean => filter.property !== changedFilterProperty
                            )
                        );
                }}
            />
        )
    }, [activeTodoFilters, todoList]);

    const renderTodoResults = () => {
        return (
            <>
                {resultTodos.length > 0 && (
                    <div className="row">
                        {resultTodos.map((todo) => (
                            <TodoCard key={todo.id} {...todo} />
                        ))}
                    </div>
                )}
                {resultTodos.length === 0 && <p>No results found!</p>}
            </>
        )
    }

    const renderTabList = useCallback(() => {
        return (
            <div className="nav nav-tabs">
                <span
                    className={viewCompleted ? "nav-link active" : "nav-link rosy"}
                    onClick={(): void => displayCompleted(true)}>
                    Complete
                </span>
                <span
                    className={viewCompleted ? "nav-link rosy" : "nav-link active"}
                    onClick={(): void => displayCompleted(false)}>
                    Incomplete
                </span>
            </div>
        );
    }, [displayCompleted, viewCompleted]);

    const renderItems = useCallback(() => {
        const newItems: TodoItem[] = resultTodos.filter(
            (item: TodoItem): boolean => item.completed === viewCompleted
        );

        return newItems.map((item: TodoItem): ReactElement => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                <span
                    className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
                    title={item.description}>
                    {item.title}
                </span>
                <span>
                    <button
                        className="btn rosy me-2"
                        onClick={(): void => editItem(item)}>
                        Edit
                    </button>
                    <button
                        className="btn indian"
                        onClick={(): void => handleDelete(item)}>
                        Delete
                    </button>
                </span>
            </li>
        ));
    }, [editItem, handleDelete, resultTodos, viewCompleted]);

    useWhatChanged(
        [activeItem, todoList, modal, viewCompleted, toggle, displayCompleted, renderTabList, renderItems, refreshList, handleSubmit, handleDelete, editItem, createItem],
        "activeItem, todoList, modal, viewCompleted, toggle, displayCompleted, renderTabList, renderItems, refreshList, handleSubmit, handleDelete, editItem, createItem"
    );

    useEffect(() => {
        refreshList();
    }, [refreshList]);

    if (loading) {
        return (<><div>Loading...</div></>);
    }

    return (
        <main className="container">
            <h1 className="text-black-50 text-uppercase text-center my-4">Todo app</h1>

            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <div className="p-2 flex-fill bd-highlight">
                            {renderTodoSearch()}
                        </div>
                        <div className="p-2 bd-highlight">
                            {renderTodoSort()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card darkred p-3">
                        <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 flex-fill bd-highlight">
                                <Button onClick={createItem} text="Add New Task"></Button>
                            </div>
                            <div className="p-2 bd-highlight">
                                <Button onClick={() => setShowAll(!showAll)} text="View All"></Button>
                            </div>
                        </div>
                        {renderTabList()}
                        <ul className="list-group list-group-flush border-top-0">
                            {renderItems()}
                        </ul>
                    </div>
                </div>
            </div>

            {showAll ? (
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 bd-highlight">
                                {renderTodoResults()}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {modal ? (
                <Modal
                    activeItem={activeItem}
                    toggle={toggle}
                    onSave={handleSubmit}
                />
            ) : null}
        </main>
    );
};

export default memo(App);

