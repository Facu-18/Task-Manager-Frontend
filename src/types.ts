export type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export type TaskForm = Pick<Task, 'title' | 'description'>

export type User = {
    _id: string;
    email: string;
    password: string;
}

export type RegisterForm = Pick<User, 'email' | 'password'> &{
    password_confirmation: string;
}

export type LoginForm = Pick<User , 'email'> &{
    password: string
}