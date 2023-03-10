import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Lyrics = () => {
    const [track, setTrack] = useState({});
    const [lyrics, setLyrics] = useState({});
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                // console.log(res.data);
                setLyrics(res?.data?.message?.body?.lyrics);
                return axios.get(`https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            }).
            then(res => {
                console.log(res?.data?.message?.body?.track);
                setTrack(res?.data?.message?.body?.track);
            })
            .catch(err => console.log(err));

    }, []);
    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
        return <Spinner />
    }
    return (
        <>
            <Link to='/' className='btn btn-dark btn-sm mb-4'>
                Go Back
            </Link>
            <div className="card">
                <h5 className="card-header">
                    {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                </h5>
                <div className="card-body">
                    <p className="card-text">{lyrics.lyrics_body}</p>
                </div>
            </div>
            <ul className="list-group mt-3">
                <li className="list-group-item">
                    <strong>Album ID</strong> : {track.album_id}
                </li>
                <li className="list-group-item">
                    <strong>Song Genre</strong> : {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                </li>
                <li className="list-group-item">
                    <strong>Explicit Words</strong> : {track.explicit === 0 ? 'No' : 'Yes'}
                </li>
                <li className="list-group-item">
                    <strong>Release Date</strong> : {moment(track.updated_time).format('MM/DD/YYYY')}
                </li>
            </ul>
        </>
    )
}

export default Lyrics;