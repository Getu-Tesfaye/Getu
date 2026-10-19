

export default async function Fetcher(url) {
     const response = await fetch(url)

     if (!response.ok) {
        throw new Error("failed to fetch data")
     }

     return response.json()
}