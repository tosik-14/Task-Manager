export type Task = {
    id: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'in_progress' | 'done' | 'canceled';
};

const statusOrder: Record<Task['status'], number> = {
    pending: 0,
    in_progress: 1,
    done: 2,
    canceled: 3,
};

function sortByDateAsc(a: Task, b: Task) {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
}

function sortByDateDesc(a: Task, b: Task) {
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
}

function sortByStatusAsc(a: Task, b: Task) {
    return statusOrder[a.status] - statusOrder[b.status];
}

function sortByStatusDesc(a: Task, b: Task) {
    return statusOrder[b.status] - statusOrder[a.status];
}

export function sortTasks(
    tasks: Task[],
    mode: 'status_asc' | 'status_desc' | 'date_asc' | 'date_desc'
): Task[] {
    switch (mode) {
        case 'status_asc':
            return [...tasks].sort(sortByStatusAsc);
        case 'status_desc':
            return [...tasks].sort(sortByStatusDesc);
        case 'date_asc':
            return [...tasks].sort(sortByDateAsc);
        case 'date_desc':
            return [...tasks].sort(sortByDateDesc);
        default:
            return tasks;
    }
}
