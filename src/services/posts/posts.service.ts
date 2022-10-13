import {CONFIG} from "./index";

import type {IPost, PostCallback} from "./index";

export const getAll = async (page: number, callback: PostCallback) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${CONFIG.LIMIT}&_page=${page}`)
    const json: IPost[] = await response.json()

    callback(json, !json.length)
}