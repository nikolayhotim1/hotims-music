import { useDispatch } from 'react-redux';
import { NextThunkDispatch } from '../store';
import { fetchAlbums, removeAlbum } from '../store/action-creators/albums';
import { IAlbum } from '../types/albums';
import { useActions } from './useActions';
import { useTypedSelector } from './useTypedSelector';

export const useDeleteAlbum = (album: IAlbum) => {
	const { setActiveAlbum } = useActions();
	const dispatch = useDispatch() as NextThunkDispatch;
	const { removeResponse } = useTypedSelector(state => state.album);

	const deleteAlbum = async (e: any) => {
		e.stopPropagation();
		setActiveAlbum(album);
		await dispatch(removeAlbum(album._id));
		if (removeResponse?.error) {
			return;
		}
		await dispatch(fetchAlbums());
	};

	return { deleteAlbum };
};