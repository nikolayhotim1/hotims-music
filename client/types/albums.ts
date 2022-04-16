import { ITrack } from './track';

export interface IAlbum {
    _id: string,
    name: string,
    author: string,
    picture: string,
    tracks: ITrack[]
};

export interface IAlbumUpdateData {
    name?: string,
    author?: string,
    picture?: File
};

export interface AlbumState {
    albums: IAlbum[],
    activeAlbum: IAlbum,
    error: string
};

export enum AlbumActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
    FETCH_ALBUM_TRACKS = 'FETCH_ALBUM_TRACKS',
    FETCH_ALBUM_TRACKS_ERROR = 'FETCH_ALBUM_TRACKS_ERROR',
    SET_ACTIVE_ALBUM = 'SET_ACTIVE_ALBUM',
    REMOVE_ALBUM = 'REMOVE_ALBUM',
    REMOVE_ALBUM_ERROR = 'REMOVE_ALBUM_ERROR',
    UPDATE_ALBUM = 'UPDATE_ALBUM',
    UPDATE_ALBUM_ERROR = 'UPDATE_ALBUM_ERROR'
}

interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS,
    payload: IAlbum[]
}

interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
    payload: string
}

interface FetchAlbumTracksAction {
    type: AlbumActionTypes.FETCH_ALBUM_TRACKS,
    payload: IAlbum[]
}

interface FetchAlbumTracksErrorAction {
    type: AlbumActionTypes.FETCH_ALBUM_TRACKS_ERROR,
    payload: string
}

interface SetActiveAlbumAction {
    type: AlbumActionTypes.SET_ACTIVE_ALBUM,
    payload: IAlbum
}
interface RemoveAlbumAction {
    type: AlbumActionTypes.REMOVE_ALBUM,
    payload: { message: string } | { error: string }
}

interface RemoveAlbumErrorAction {
    type: AlbumActionTypes.REMOVE_ALBUM_ERROR,
    payload: string
}

interface UpdateAlbumAction {
    type: AlbumActionTypes.UPDATE_ALBUM,
    payload: IAlbum
}

interface UpdateAlbumErrorAction {
    type: AlbumActionTypes.UPDATE_ALBUM_ERROR,
    payload: string
}

export type AlbumAction =
    | FetchAlbumsAction
    | FetchAlbumsErrorAction
    | FetchAlbumTracksAction
    | FetchAlbumTracksErrorAction
    | SetActiveAlbumAction
    | RemoveAlbumAction
    | RemoveAlbumErrorAction
    | UpdateAlbumAction
    | UpdateAlbumErrorAction;