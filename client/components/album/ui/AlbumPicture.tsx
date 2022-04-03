import React from 'react';
import { IAlbum } from '../../../types/albums';
import styles from './styles/AlbumPage.module.scss';
import FileUpload from '../../FileUpload';
import { useOnPictureUpdate } from '../model/hooks';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { NextThunkDispatch, wrapper } from '../../../store';
import { fetchAlbums } from '../../../store/action-creators/albums';
import axios from 'axios';

interface AlbumPictureProps {
	thisAlbum: IAlbum;
}
export const AlbumPicture: React.FC<AlbumPictureProps> = ({ thisAlbum }) => {
	const { setPicture, setGlobTrackPicture, globTrackPicture } =
		useOnPictureUpdate(thisAlbum);
	return (
		<FileUpload
			setFile={setPicture}
			setGlobImage={setGlobTrackPicture}
			accept='image/*'
		>
			<div className={styles.mainCoverContainer}>
				<div className={styles.iconContainer}>
					<PhotoLibraryIcon className={styles.insertPhotoIcon} />
				</div>
				<img
					src={
						globTrackPicture
							? globTrackPicture
							: 'http://localhost:5000/' + thisAlbum.picture
					}
					alt='album picture'
				/>
			</div>
		</FileUpload>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
	async ({ params }) => {
		const dispatch = store.dispatch as NextThunkDispatch;
		await dispatch(fetchAlbums());
		const responseAlbum = await axios.get(
			'http://localhost:5000/albums/' + params?.id
		);
		return {
			props: {
				serverAlbum: responseAlbum.data,
			},
		};
	}
);