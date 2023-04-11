export default interface ITodoItem {
    id?: number;
    title: string;
    description: string;
    completed: boolean;
    due_date?: string | null;
    priority: number;
}

export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
}
