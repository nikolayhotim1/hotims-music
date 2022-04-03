import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextThunkDispatch, wrapper } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { fetchAlbums, searchAlbums } from '../../store/action-creators/albums';
import { AlbumList } from '../../components/album/ui/AlbumList';

const Index = () => {
	const router = useRouter();
	const { albums } = useTypedSelector(state => state.album);
	const [query, setQuery] = useState<string>('');
	const dispatch = useDispatch() as NextThunkDispatch;
	const [timer, setTimer] = useState<any>(null);

	const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		if (timer) {
			clearTimeout(timer);
		}
		setTimer(setTimeout(async () => {
			await dispatch(searchAlbums(e.target.value));
		}, 500));
	};

	return (
		<MainLayout title={'Albums | Music App'}>
			<Grid container justifyContent='center'>
				<Card style={{ width: '900px' }}>
					<Box style={{ padding: '1.8rem' }}>
						<Grid container justifyContent='space-between'>
							<h1>Album List</h1>
							<Button onClick={() => router.push('/albums/create')}>
								Create New Album
							</Button>
						</Grid>
					</Box>
					<TextField
						label={'Album search'}
						fullWidth
						value={query}
						onChange={search}
					/>
					<AlbumList albums={albums} />
				</Card>
			</Grid>
		</MainLayout>
	);
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(store =>
	async () => {
		const dispatch = store.dispatch as NextThunkDispatch;
		await dispatch(fetchAlbums());
		return { props: {} };
	}
);