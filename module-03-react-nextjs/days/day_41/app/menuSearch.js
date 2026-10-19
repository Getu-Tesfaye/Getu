 
 "use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import Fetcher from "./lib/fetcher"

export default function MenuSearch() {

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [page, setPage] = useState(1)


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const key = debouncedSearch ? `/api/dishes?search=${debouncedSearch}&page=${page}`: null

    const {data, error, isLoading } = useSWR(key, Fetcher, {keepPreviousData: true, staleTime: 5000})

    return (

        <main>

            <h1>Addis Eats</h1>

            <input type="text" placeholder="search dishes.." value={search}
            onChange={(e) => setSearch(e.target.value)}/>

            {error && <p>failed to load dishes</p>}

            {isLoading && <p>loaading...</p>}

            {data && 
            data.map((dish) => (
                <div key={dish.id}>
                    <h1>{dish.name}</h1>
                    <p>{dish.price}</p>
                </div>
            ))}

            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>previous</button>

                <span> page {page} </span>

                <button onClick={() => setPage(page + 1)}>next</button>
            
            </div>
        </main>
    )
}