import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFetchTracks(tracksCount: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: 'http://localhost:5000/tracks',
            params: {
                tracksCount
            }
        })
            .then((res) => {
                setTracks(res.data);
                setLoading(false);
            })
            .catch((e) => {
                setError(true);
            });
    }, [tracksCount]);

    return {
        loading,
        error,
        tracks
    };
};