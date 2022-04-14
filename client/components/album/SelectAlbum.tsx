import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addTrackToAlbum, fetchTracks, removeTrackFromAlbum } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ITrack } from '../../types/track';
import { NextThunkDispatch, wrapper } from '../../store';
import s from './styles/SelectAlbum.module.scss';
import { Grid, TextField } from '@mui/material';
import axios from 'axios';
import { fetchAlbums, searchAlbums } from '../../store/action-creators/albums';
import MainLayout from '../../layouts/MainLayout';

interface SelectAlbumProps {
    track: ITrack
}

export let selectedAlbumForCreateTrack: string;

const SelectAlbum: React.FC<SelectAlbumProps> = ({ track }) => {
    const { albums, activeAlbum, error } = useTypedSelector(state => state.album);
    const openedFrom = {
        TRACK_LIST: track?.album?._id,
        ALBUM_LIST: activeAlbum?._id,
        CREATE_TRACK: !track,
        ANOTHER_PLACE: ''
    };
    const [selectedAlbumId, setSelectedAlbumId] = useState<string>(
        openedFrom.TRACK_LIST || openedFrom.ALBUM_LIST || openedFrom.ANOTHER_PLACE
    );
    const [selectedTrack, setSelectedTrack] = useState(track);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState<any>();

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (timer) {
            clearTimeout(timer);
        }
        setTimer(setTimeout(async () => {
            await dispatch(searchAlbums(e.target.value));
        }, 1000));
    };

    if (error) {
        return (
            <MainLayout>
                <h1>{error}</h1>
            </MainLayout>
        );
    }

    const handleChange: any = async (e: React.ChangeEvent<{ value: unknown }>) => {
        const selectedAlbumId = e.target.value as string;
        setSelectedAlbumId(selectedAlbumId);
        if (openedFrom.CREATE_TRACK) {
            setSelectedAlbumId(selectedAlbumId);
            selectedAlbumForCreateTrack = selectedAlbumId;
            return;
        }
        if (selectedAlbumId === '') {
            await dispatch(
                removeTrackFromAlbum(
                    selectedTrack.album?._id || activeAlbum?._id,
                    selectedTrack._id
                )
            );
            if (openedFrom.ALBUM_LIST) {
                await dispatch(fetchTracks());
                return;
            }
            setSelectedTrack(prev => ({ ...prev, album: undefined }));
        }
        if (selectedTrack.album?._id || activeAlbum?._id) {
            console.log('removing selectedTrack from album...');
            await dispatch(
                removeTrackFromAlbum(
                    selectedTrack.album?._id || activeAlbum?._id,
                    selectedTrack._id
                )
            );
            setSelectedTrack(prev => ({ ...prev, album: undefined }));
        }
        await dispatch(addTrackToAlbum(selectedAlbumId, selectedTrack._id));
        const album = albums.find(album => album._id === selectedAlbumId);
        if (activeAlbum?._id) {
            await dispatch(fetchTracks());
            return;
        }
        setSelectedTrack(prev => ({ ...prev, album }));

        await dispatch(fetchTracks());
    };

    return (
        <Grid
            className={s.container}
            onClick={e => e.stopPropagation()}
        >
            <FormControl variant='outlined'>
                <InputLabel id='select-label'>Album</InputLabel>
                <Select
                    labelId='select-label'
                    id='select'
                    value={selectedAlbumId}
                    onChange={handleChange}
                    label='Album'
                    className={s.select}
                >
                    <MenuItem value=''>
                        <em>No Album</em>
                    </MenuItem>
                    <TextField
                        type='search'
                        label={'Search Albums'}
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    {albums.map(album => {
                        return (
                            <MenuItem key={album._id} value={album._id}>
                                {album.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default SelectAlbum;

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async () => {
        const dispatch = store.dispatch as NextThunkDispatch;
        const response = await axios.get(`http://localhost:5000/albums`);
        await dispatch(fetchAlbums());
        await dispatch(fetchTracks());
        return {
            props: {
                serverTrack: response.data
            }
        };
    }
);