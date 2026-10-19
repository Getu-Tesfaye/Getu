
# Data Fetching

## Order

Query key:

/api/orders/[id]

Purpose:

Fetches one order by its ID.

Polling:

5000ms

The order is checked every five seconds.

fallbackData:

The server-rendered order is used as the initial SWR data so there is no spinner on first paint.

## Menu Search

Query key:

/api/dishes?search={search}&page={page}

Purpose:

Fetches dishes based on the search term and page number.

Null key:

When the search term is empty, the SWR key is null, so no request is made.

keepPreviousData:

Keeps the previous results visible while the new search results load.

staleTime:

5000ms

The fetched data is considered fresh for five seconds.