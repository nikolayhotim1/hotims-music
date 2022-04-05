import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addTrackToAlbum, fetchTracks, removeTrackFromAlbum } from '../../../store/action-creators/track';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ITrack } from '../../../types/track';
import { NextThunkDispatch } from '../../../store';
import s from '../styles/SelectAlbum.module.scss';
import { Grid } from '@mui/material';

interface SelectAlbumProps {
    track?: ITrack
}

export let selectedAlbumForCreateTrack: string;

export const SelectAlbum: React.FC<SelectAlbumProps> = ({ track }) => {
    const { albums, activeAlbum } = useTypedSelector(state => state.album);
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

    const handleChange = async (e: React.ChangeEvent<{ value: unknown }>) => {
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
        await dispatch(await addTrackToAlbum(selectedAlbumId, selectedTrack._id));
        const album = albums.find(album => album._id === selectedAlbumId);
        if (activeAlbum?._id) {
            await dispatch(await fetchTracks());
            return;
        }
        setSelectedTrack(prev => ({ ...prev, album }));
    };

    return (
        <Grid
            className={s.select_album}
            onClick={e => e.stopPropagation()}
        >
            <FormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Album</InputLabel>
                <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={selectedAlbumId}
                    onChange={handleChange}
                    label='Album'
                    className={s.select}
                >
                    <MenuItem value=''>
                        <em>No Album</em>
                    </MenuItem>
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