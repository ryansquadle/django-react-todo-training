import { format } from "date-fns";
import ITodoItem from "../interfaces/ITodoItem";

const todos: Array<ITodoItem> = [
    {
        id: 1,
        title: "I am title 1",
        description: "cool description 1",
        priority: 3,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 2,
        title: "Title 2",
        description: "cool description 2",
        priority: 2,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: true
    },
    {
        id: 3,
        title: "Title Three",
        description: "another description",
        priority: 1,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 4,
        title: "Title 4: I love generics",
        description: "generics are awesome!",
        priority: 1,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 5,
        title: "We also love TypeScript",
        description: "Yes, TypeScript is also very cool",
        priority: 3,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 6,
        title: "X",
        description: "X",
        priority: 2,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 7,
        title: "Y",
        description: "Y",
        priority: 2,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 8,
        title: "Z",
        description: "Z",
        priority: 1,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: true
    },
    {
        id: 9,
        title: "A",
        description: "A",
        priority: 1,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        id: 10,
        title: "B",
        description: "B",
        priority: 1,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        title: "C",
        description: "C",
        id: 11,
        priority: 3,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        title: "",
        description: "I am the description. This card has an empty, i.e. 'falsy' title :(",
        id: 12,
        priority: 2,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
    {
        title: "I am the title. This card has an empty, i.e. 'falsy' description :(",
        description: "",
        id: 13,
        priority: 3,
        due_date: format(new Date(+new Date() - Math.floor(Math.random() * 10000000000)), "yyyy-MM-dd"),
        completed: false
    },
];

export default todos;