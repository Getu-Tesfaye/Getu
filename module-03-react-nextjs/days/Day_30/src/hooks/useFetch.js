import {useState, useEffect} from 'react';

export  function useFetch(url) {
    const[data, setData] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(url, {signal:controller.signal})
        .then((res) => {
            if (!res.ok) throw new error('failedto fetch data');
            return res.json();
        })
        .then((data) => {
            setData(data);
            setError(null)
        })
        .catch((err) => {
            if (err.name !== 'AbortError') {
                setError(err.message);
            }
        })
        .finally(() => setLoading(false));

        return () => controller.abort();

    }, [url]);
     
    return { data, setData, error };
                   
}