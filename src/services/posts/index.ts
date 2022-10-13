import {getAll} from "services/posts/posts.service";

export interface IPost {
    userId: number
    id: number
    title: string
    body: string
}

export const CONFIG = {
    LIMIT: 10,
};

export type PostCallback = (posts: IPost[], done: boolean) => void

export default {
    getAll
}