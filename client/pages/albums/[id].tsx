import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { NextThunkDispatch, wrapper } from '../../store';
import { IAlbum } from '../../types/albums';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { fetchAlbums, updateAlbum } from '../../store/action-creators/albums';
import { Button, Grid } from '@mui/material';
import { AlbumTrackList } from '../../components/album/ui/AlbumTrackList';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { useOnBlurUpdate, useOnPictureUpdate } from '../../components/album/model/hooks';
import EditIcon from '@mui/icons-material/Edit';
import s from './styles/[id].module.scss';
import { fetchTracks } from '../../store/action-creators/track';

interface AlbumPageProps {
	serverAlbum: IAlbum
}

const AlbumPage: React.FC<AlbumPageProps> = ({ serverAlbum }) => {
	const [thisAlbum, setThisAlbum]: any = useState<IAlbum>(serverAlbum);
	const { tracks } = useTypedSelector(state => state.track);
	const { setActiveAlbum } = useActions();
	const router = useRouter();
	const nameRef: any = useRef<HTMLSpanElement>();
	const artistRef: any = useRef<HTMLSpanElement>();
	const { isEditable, handleClickOnEditIcon, handleOnBlurAlbumUpdate } = useOnBlurUpdate(thisAlbum, setThisAlbum);
	const { globTrackPicture } = useOnPictureUpdate(thisAlbum);

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
			title={`Hotims Music - ${thisAlbum.name}, ${thisAlbum.author}`}
			keywords={`Music, tracks, artists, ${thisAlbum.name}, ${thisAlbum.author}`}
		>
			<Button
				className={s.list}
				variant={'outlined'}
				onClick={() => router.push('/albums')}
			>
				To Album List
			</Button>
			<Grid
				container
				className={s.track_description}
			>
				<img
					src={globTrackPicture
						? globTrackPicture
						: `http://localhost:5000/${thisAlbum.picture}`
					}
					alt='Album cover'
				/>
				<div>
					<h1>
						<span
							className={`${s.spanField}${isEditable ? ' ' + s.isEditable : ''}`}
							ref={nameRef}
							onBlur={() => handleOnBlurAlbumUpdate(nameRef, 'name')}
							contentEditable={isEditable}
						>
							{thisAlbum.name}
						</span>
						<EditIcon
							onClick={() => handleClickOnEditIcon(nameRef)}
							className={s.editIcon}
						/>
					</h1>
					<h2>
						<span
							ref={artistRef}
							contentEditable={isEditable}
							onBlur={() => handleOnBlurAlbumUpdate(artistRef, 'author')}
							className={`${s.spanField}${isEditable ? ' ' + s.isEditable : ''}`}
						>
							{thisAlbum.author}
						</span>
						<EditIcon
							onClick={() => handleClickOnEditIcon(artistRef)}
							className={s.editIcon}
						/>
					</h2>
					<h3>Tracks: {thisAlbum.tracks.length}</h3>
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
		await dispatch(fetchTracks());
		const responseAlbum = await axios.get(
			`http://localhost:5000/albums/${params?.id}`
		);
		return {
			props: {
				serverAlbum: responseAlbum.data,
			},
		};
	}
);