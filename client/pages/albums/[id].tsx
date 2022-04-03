import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NextThunkDispatch, wrapper } from '../../store';
import { IAlbum } from '../../types/albums';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchAlbums, updateAlbum } from '../../store/action-creators/albums';
import { AlbumDescription, AlbumHeader, AlbumPicture } from '../../components/album/ui';
import { Button, Grid } from '@mui/material';
import { AlbumTrackList } from '../../components/album/ui/AlbumTrackList';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { useOnBlurUpdate, useOnPictureUpdate } from '../../components/album/model/hooks';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../components/album/ui/styles/AlbumPage.module.scss';
import FileUpload from '../../components/FileUpload';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

interface AlbumPageProps {
	serverAlbum: IAlbum;
}

// interface AlbumPictureProps {
// 	thisAlbum: IAlbum;
// }

const AlbumPage: React.FC<AlbumPageProps> = ({ serverAlbum }) => {
	const [thisAlbum, setThisAlbum]: any = useState<IAlbum>(serverAlbum);
	const { tracks } = useTypedSelector(state => state.track);
	const { setActiveAlbum } = useActions();
	const router = useRouter();
	const nameRef = useRef<HTMLSpanElement>(null);
	const artistRef = useRef<HTMLSpanElement>(null);
	const { isEditable, handleClickOnEditIcon, handleOnBlurAlbumUpdate } = useOnBlurUpdate(thisAlbum, setThisAlbum);
	const { setPicture, setGlobTrackPicture, globTrackPicture } = useOnPictureUpdate(thisAlbum);

	setActiveAlbum(serverAlbum);

	useEffect(() => {
		if (
			thisAlbum.tracks.length === serverAlbum.tracks.length &&
			tracks.length === 0
		)
			return;
		refreshAlbumData();
	}, [tracks]);

	useEffect(() => {
		if (serverAlbum) {
			setActiveAlbum(serverAlbum);
		}
	}, []);

	const findTracksBelongedToThisAlbum = () => {
		const belongedTracks = tracks.filter(track => {
			return track.album?._id === thisAlbum._id;
		});
		return belongedTracks;
	};

	const refreshAlbumData = () => {
		const belongedTracks = findTracksBelongedToThisAlbum();
		setThisAlbum({ ...thisAlbum, tracks: belongedTracks });
	};

	return (
		<MainLayout
			title={`Music App | ${thisAlbum.author} - ${thisAlbum.name}`}
			keywords={`music, albums, artists, ${thisAlbum.name}, ${thisAlbum.author}`}
		>
			{/* <AlbumHeader /> */}
			<Button
				variant={'outlined'}
				style={{ fontSize: 24 }}
				onClick={() => router.push('/albums')}
			>
				Back to album list
			</Button>
			<Grid container style={{ margin: '20px 0' }}>
				{/* <AlbumPicture thisAlbum={thisAlbum} /> */}
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
				{/* <AlbumDescription thisAlbum={thisAlbum} setThisAlbum={setThisAlbum} /> */}
				<div style={{ margin: 30 }}>
					<h2>
						Name:{' '}
						<span
							className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''}`}
							ref={nameRef}
							onBlur={() => handleOnBlurAlbumUpdate(nameRef, 'name')}
							contentEditable={isEditable}
						>
							{thisAlbum.name}
						</span>{' '}
						<EditIcon
							onClick={() => handleClickOnEditIcon(nameRef)}
							className={styles.editIcon}
						/>
					</h2>
					<h2>
						Artist:{' '}
						<span
							ref={artistRef}
							contentEditable={isEditable}
							onBlur={() => handleOnBlurAlbumUpdate(artistRef, 'author')}
							className={`${styles.spanField}${isEditable ? ' ' + styles.isEditable : ''}`}
						>
							{thisAlbum.author}
						</span>{' '}
						<EditIcon
							onClick={() => handleClickOnEditIcon(artistRef)}
							className={styles.editIcon}
						/>
					</h2>
					<h2>Tracks: {thisAlbum.tracks.length}</h2>
				</div>
			</Grid>

			<AlbumTrackList thisAlbum={thisAlbum} />
		</MainLayout>
	);
};

export default AlbumPage;

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