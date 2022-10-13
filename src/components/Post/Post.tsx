import React, { FC } from 'react'

import type { IPost } from 'services/posts'

import './Post.scss'

type PostProps = {} & IPost

export const Post: FC<PostProps> = ({ userId, id, title, body }) => (
    <div className="post">
        <div className="post__author">Author: {userId}</div>
        <div className="post__title">{title}</div>
    </div>
)
