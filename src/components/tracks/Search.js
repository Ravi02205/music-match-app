import React, { useState } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
function Search() {

    const [trackTitle, setTrackTitle] = useState('');
    const onChange = (e) => {
        setTrackTitle(e.target.value);
    }
    const findTrack = (e, dispatch) => {
        e.preventDefault();
        axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res?.data?.message?.body?.track_list
                })
                setTrackTitle('');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <Consumer>
                {
                    value => {
                        const { dispatch } = value;
                        return (
                            <div className="card card-body mb-4 p-4">
                                <h1 className="display-4 text-center">
                                    <i className="fas fa-music"></i> Search for Music
                                </h1>
                                <p className="lead text-center">Get the lyrics of any song</p>
                                <form onSubmit={(e) => { findTrack(e, dispatch) }}>
                                    <div className="form-group">
                                        <input type="text" name="trackTitle" className="form-control form-control-lg mb-3" placeholder='Song Title.....' value={trackTitle} onChange={onChange} />
                                        <button className="btn btn-primary btn-lg w-100 mb-5" type='submit'> Get Track Lyrics </button>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                }
            </Consumer>
        </>
    );
}

export default Search;