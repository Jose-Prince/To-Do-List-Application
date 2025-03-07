export type Task = {
    id: number,
    title: string,
    description: string | null,
    is_completed: boolean,
    created_at: string
}

export type Meta = {
    pages: number,
    next: string | null,
    previous: string | null
}
