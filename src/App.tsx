import React, { useCallback, useEffect, useRef, useState } from 'react'

import { PostList } from 'components/PostList/PostList'
import { Loader } from 'components/Loader/Loader'

import PostsService from 'services/posts/'

import type { IPost } from 'services/posts/'

const INITIAL_PAGE = 1

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
}

function App() {
    const [posts, setPosts] = useState<IPost[]>([])
    const stopLineRef = useRef<HTMLDivElement | null>(null)
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const handleObserver: IntersectionObserverCallback = useCallback(
        (entries, observer) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    setLoading(true)
                    const posts = await PostsService.getAll(page)

                    if (posts.length) {
                        setPage((prev) => prev + 1)
                        setPosts((prev) => [...prev, ...posts])
                    } else {
                        setDone(true)
                    }

                    setLoading(false)
                }
            })
        },
        [page]
    )

    useEffect(() => {
        if (!done) {
            const observer = new IntersectionObserver(handleObserver, options)

            if (stopLineRef.current) observer.observe(stopLineRef.current)

            return () => {
                if (stopLineRef.current)
                    observer.unobserve(stopLineRef.current!)
            }
        }
    }, [handleObserver, done])

    return (
        <main className="main">
            <div className="content">
                <PostList posts={posts} />
                <div className="stop-line" ref={stopLineRef}>
                    {loading ? <Loader /> : 'На этом все!'}
                </div>
            </div>
        </main>
    )
}

export default App
