import { IAlbum } from './albums';

export interface IComment {
    _id: string,
    username: string,
    text: string
};

export interface ITrack {
    _id: string,
    name?: string,
    artist?: string,
    text?: string,
    listens: number,
    picture?: string,
    audio?: string,
    duration: number,
    comments: IComment[],
    album?: IAlbum
};

export interface TrackState {
    tracks: ITrack[],
    error: string
};

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    REMOVE_TRACK = 'REMOVE_TRACK',
    REMOVE_TRACK_ERROR = 'REMOVE_TRACK_ERROR',
    REMOVE_TRACK_FROM_ALBUM = 'REMOVE_TRACK_FROM_ALBUM',
    REMOVE_TRACK_FROM_ALBUM_ERROR = 'REMOVE_TRACK_FROM_ALBUM_ERROR',
    ADD_TRACK_TO_ALBUM = 'ADD_TRACK_TO_ALBUM',
    ADD_TRACK_TO_ALBUM_ERROR = 'ADD_TRACK_TO_ALBUM_ERROR',
    UPDATE_TRACK = 'UPDATE_TRACK',
    UPDATE_TRACK_ERROR = 'UPDATE_TRACK_ERROR',
    LISTEN_TRACK = 'LISTEN_TRACK',
    LISTEN_TRACK_ERROR = 'LISTEN_TRACK_ERROR'
};

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS,
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR,
    payload: string
}

interface RemoveTrackAction {
    type: TrackActionTypes.REMOVE_TRACK,
    payload: string
}

interface RemoveTrackErrorAction {
    type: TrackActionTypes.REMOVE_TRACK_ERROR,
    payload: string
}

interface RemoveTrackFromAlbumAction {
    type: TrackActionTypes.REMOVE_TRACK_FROM_ALBUM,
    payload: string
}

interface RemoveTrackFromAlbumErrorAction {
    type: TrackActionTypes.REMOVE_TRACK_FROM_ALBUM_ERROR,
    payload: string
}

interface AddTrackToAlbumAction {
    type: TrackActionTypes.ADD_TRACK_TO_ALBUM,
    payload: string
}

interface AddTrackToAlbumErrorAction {
    type: TrackActionTypes.ADD_TRACK_TO_ALBUM_ERROR,
    payload: string
}

interface UpdateTrackAction {
    type: TrackActionTypes.UPDATE_TRACK,
    payload: ITrack
}

interface UpdateTrackErrorAction {
    type: TrackActionTypes.UPDATE_TRACK_ERROR,
    payload: string
}

interface ListenTrackAction {
    type: TrackActionTypes.LISTEN_TRACK,
    payload: ITrack
}

interface ListenTrackErrorAction {
    type: TrackActionTypes.LISTEN_TRACK_ERROR,
    payload: string
}

export type TrackAction =
    | FetchTracksAction
    | FetchTracksErrorAction
    | RemoveTrackAction
    | RemoveTrackErrorAction
    | RemoveTrackFromAlbumAction
    | RemoveTrackFromAlbumErrorAction
    | AddTrackToAlbumAction
    | AddTrackToAlbumErrorAction
    | UpdateTrackAction
    | UpdateTrackErrorAction
    | ListenTrackAction
    | ListenTrackErrorAction;

export interface ITrackUpdateData {
    name?: string,
    artist?: string,
    text?: string,
    picture?: File,
    audio?: File
};