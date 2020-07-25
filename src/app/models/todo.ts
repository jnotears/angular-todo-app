export class Todo{
    id: number;
    title: string;
    description: string;
    status: 'new' | 'done';
    userId: number;
}

export interface Todo{
    title: string;
    description: string;
    status: 'new' | 'done';
}