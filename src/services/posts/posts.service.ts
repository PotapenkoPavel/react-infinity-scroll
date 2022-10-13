import axios, { AxiosResponse } from 'axios'

import type { IPost } from './index'

const CONFIG = {
    LIMIT: 10,
}

export const getAll = async (page: number, limit: number = CONFIG.LIMIT) => {
    const { status, data }: AxiosResponse<IPost[]> = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    )

    if (status !== 200) {
        throw new Error('Something went wrong')
    }

    return data
}
