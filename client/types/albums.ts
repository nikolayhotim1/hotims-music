import { ITrack } from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    author: string;
    picture: string;
    tracks: ITrack[];
}

export interface IAlbumUpdateData {
    name?: string;
    author?: string;
    picture?: File;
}

type TRemoveResponse = {
    message?: string;
    error?: string;
};

export interface AlbumState {
    albums: IAlbum[];
    activeAlbum: null | IAlbum;
    removeResponse: null | TRemoveResponse;
}

export enum AlbumActionTypes {
    FETCH_ALBUMS = "FETCH_ALBUMS",
    FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
    SET_ACTIVE_ALBUM = "SET_ACTIVE_ALBUM",
    REMOVE_ALBUM = "REMOVE_ALBUM",
    REMOVE_ALBUM_ERROR = "REMOVE_ALBUM_ERROR",
    SET_RESPONSE_ERROR = "SET_RESPONSE_ERROR",
    SET_RESPONSE_MESSAGE = "SET_RESPONSE_MESSAGE",
    UPDATE_ALBUM = "UPDATE_ALBUM",
    UPDATE_ALBUM_ERROR = "UPDATE_ALBUM_ERROR",
}

interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS;
    payload: IAlbum[];
}

interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR;
    payload: string;
}
interface SetActiveAlbumAction {
    type: AlbumActionTypes.SET_ACTIVE_ALBUM;
    payload: IAlbum;
}
interface RemoveAlbumAction {
    type: AlbumActionTypes.REMOVE_ALBUM;
    payload: { message: string } | { error: string };
}

interface RemoveAlbumErrorAction {
    type: AlbumActionTypes.REMOVE_ALBUM_ERROR;
    payload: string;
}

interface SetResponseErrorAction {
    type: AlbumActionTypes.SET_RESPONSE_ERROR;
    payload: string;
}

interface SetResponseMessageAction {
    type: AlbumActionTypes.SET_RESPONSE_MESSAGE;
    payload: string;
}

interface UpdateAlbumAction {
    type: AlbumActionTypes.UPDATE_ALBUM;
    payload: IAlbum;
}

interface UpdateAlbumErrorAction {
    type: AlbumActionTypes.UPDATE_ALBUM_ERROR;
    payload: string;
}

export type AlbumAction =
    | FetchAlbumsAction
    | FetchAlbumsErrorAction
    | SetActiveAlbumAction
    | RemoveAlbumAction
    | RemoveAlbumErrorAction
    | SetResponseErrorAction
    | SetResponseMessageAction
    | UpdateAlbumAction
    | UpdateAlbumErrorAction;