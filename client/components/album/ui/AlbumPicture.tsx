import React from 'react';
import { IAlbum } from '../../../types/albums';
import styles from './styles/AlbumPage.module.scss';
import FileUpload from '../../FileUpload';
import { useOnPictureUpdate } from '../model/hooks';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

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