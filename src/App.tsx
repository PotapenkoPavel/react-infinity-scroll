import React, {useCallback, useEffect, useRef, useState} from 'react';

import {PostList} from "components/PostList/PostList";
import {Loader} from "components/Loader/Loader";

import PostsService from "services/posts/";

const LIMIT = 10
const INITIAL_PAGE = 1

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
}

export interface IPost {
    userId: number
    id: number
    title: string
    body: string
}

function App() {
    const [page, setPage] = useState<number>(INITIAL_PAGE)
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const stopLineRef = useRef<HTMLDivElement | null>(null)
    const [done, setDone] = useState(false)

    const handleObserver: IntersectionObserverCallback = useCallback((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (done) return
                setLoading(true)
                PostsService.getAll(page, (posts, done) => {
                    setPosts((prev) => [...prev, ...posts])
                    if (done) {
                        console.log(done)
                        setDone(true)
                    } else {
                        setPage(prev => prev + 1)
                    }
                    setLoading(false)
                })
            }
        })
    }, [page, done])

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, options);

        if (stopLineRef.current)
            observer.observe(stopLineRef.current);

        return () => {
            if (stopLineRef.current)
                observer.unobserve(stopLineRef.current!)
        }
    }, [handleObserver])

    return (
        <main className="main">
            <div className="content">
                <PostList posts={posts}/>
                <div className="stop-line" ref={stopLineRef}>
                    {loading ? <Loader/> : "На этом все!"}
                </div>
            </div>
        </main>
    )
}

export default App;
