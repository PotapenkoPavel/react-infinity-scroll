import React, { FC } from 'react'

import { Post } from 'components/Post/Post'

import type { IPost } from 'services/posts'

import './PostList.scss'

type PostListProps = {
    posts: IPost[]
}

export const PostList: FC<PostListProps> = ({ posts }) => {
    if (!posts.length) return null

    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post
                    key={post.id}
                    userId={post.userId}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                />
            ))}
        </div>
    )
}
