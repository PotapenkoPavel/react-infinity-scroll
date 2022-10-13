import { getAll } from 'services/posts/posts.service'

export interface IPost {
    userId: number
    id: number
    title: string
    body: string
}

export default {
    getAll,
}
