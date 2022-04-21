import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';
import { fetchAlbums, removeAlbum } from '../store/action-creators/albums';
import { IAlbum } from '../types/albums';
import { useActions } from './useActions';

export const useDeleteAlbum = (album: IAlbum) => {
    const { setActiveAlbum } = useActions();
    const dispatch = useDispatch() as NextThunkDispatch;

    const deleteAlbum = async (e: any) => {
        try {
            e.stopPropagation();
            setActiveAlbum(album);
            await dispatch(removeAlbum(album._id));
            await dispatch(fetchAlbums());
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return { deleteAlbum };
};