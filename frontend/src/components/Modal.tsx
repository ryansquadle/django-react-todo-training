import React, { useState, ChangeEventHandler, ChangeEvent } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type ActiveItem = {
    title: string;
    description: string;
    completed: boolean;
    due_date?: string | null;
    priority: number;
}

type CustomModalProps = {
    activeItem: ActiveItem;
    toggle: () => void;
    onSave: (value: ActiveItem) => void;
}

const normalizeDate: (date: Date) => Date = (date: Date): Date => {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
};

const CustomModal: (props: CustomModalProps) => JSX.Element = (props: CustomModalProps): JSX.Element => {
    const { toggle, onSave } = props;
    const [activeItem, setActiveItem] = useState<ActiveItem>(props.activeItem);

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({
        currentTarget: { name, value, type, checked }
    }: ChangeEvent<HTMLInputElement>): void => setActiveItem({ ...activeItem, [name]: type === "checkbox" ? checked : value });

    return (
        <>
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-title">Title</Label>
                            <Input
                                type="text"
                                id="todo-title"
                                name="title"
                                value={activeItem.title}
                                onChange={handleChange}
                                placeholder="Enter Todo Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                                type="text"
                                id="todo-description"
                                name="description"
                                value={activeItem.description}
                                onChange={handleChange}
                                placeholder="Enter Todo description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-due-date">Due Date</Label>
                            <DatePicker
                                id="todo-due-date"
                                name="due_date"
                                className="picker"
                                dateFormat="yyyy-MM-dd"
                                selected={activeItem.due_date ? normalizeDate(new Date(activeItem.due_date)) : null}
                                value={activeItem.due_date}
                                onChange={(date: string): void => {
                                    if (date) {
                                        const dateFormatted: string = format(new Date(date), "yyyy-MM-dd");
                                        setActiveItem({ ...activeItem, "due_date": dateFormatted });
                                    } else {
                                        setActiveItem({ ...activeItem, "due_date": null });
                                    }
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-priority">Priority</Label>
                            <Input
                                type="select"
                                id="todo-priority"
                                name="priority"
                                value={activeItem.priority}
                                onChange={handleChange}
                                placeholder="Enter Todo priority"
                            >
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={activeItem.completed}
                                    onChange={handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={(): void => onSave(activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CustomModal;