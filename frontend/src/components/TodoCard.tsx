import React from "react";
import ITodoItem, { Priority } from "../interfaces/ITodoItem";

export function TodoCard(props: ITodoItem) {
    const {
        title,
        description,
        completed,
        due_date,
        priority,
        id,
    } = props;
    return (
        <div className="col-12 p-3">
            <div className="card whitesmoke">
                <div className="card-body">
                    <h1 className="card-title mb-0">{title}</h1>
                    <p className="mb-3">{description}</p>
                    <p className="mb-0">Status: {completed ? "Complete" : "Incomplete"}</p>
                    <p className="mb-0">Due Date: {due_date}</p>
                    <p className="mb-0">Priority: {Priority[priority]}</p>
                </div>
                <div className="card-footer text-muted text-right">
                    <span className="float-left">#{id}</span>
                </div>
            </div>
        </div>
    );
}